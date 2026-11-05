-- Adds the admin role, per-portfolio visit counting, and tighter read rules.
-- Run after 20261028_add_portfolio_template.sql.

-- 1. Role, display metadata and the admin's own portfolio linkage.
alter table public.profiles
  add column if not exists role text not null default 'user',
  add column if not exists bio text,
  add column if not exists website text,
  add column if not exists updated_at timestamptz not null default now();

alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles
  add constraint profiles_role_check check (role in ('user', 'admin'));

-- 2. Visit counters live on the portfolio itself so the owner's dashboard is one query.
alter table public.portfolios
  add column if not exists view_count bigint not null default 0,
  add column if not exists last_viewed_at timestamptz;

-- 3. Raw visit log, so the admin can see recent traffic rather than only a total.
create table if not exists public.portfolio_visits (
  id bigint generated always as identity primary key,
  portfolio_id uuid references public.portfolios(id) on delete cascade not null,
  slug text not null,
  viewed_on date not null default current_date,
  created_at timestamptz not null default now()
);

create index if not exists portfolio_visits_portfolio_idx on public.portfolio_visits(portfolio_id, created_at desc);
create index if not exists portfolio_visits_slug_idx on public.portfolio_visits(slug);

-- 4. The counter is written by a SECURITY DEFINER function so anonymous visitors
--    can record a view without being granted UPDATE on portfolios (which would
--    also let them rewrite someone's content).
create or replace function public.record_portfolio_view(portfolio_slug text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  target_id uuid;
begin
  select id into target_id from public.portfolios where slug = portfolio_slug and is_published = true;
  if target_id is null then
    return;
  end if;

  update public.portfolios
     set view_count = view_count + 1,
         last_viewed_at = now()
   where id = target_id;

  insert into public.portfolio_visits (portfolio_id, slug) values (target_id, portfolio_slug);
end;
$$;

revoke all on function public.record_portfolio_view(text) from public;
grant execute on function public.record_portfolio_view(text) to anon, authenticated;

-- 5. Read rules. A portfolio used to be readable only when published, but
--    "/portfolio/<slug>" is the owner's own preview too, so owners always see theirs.
drop policy if exists "Published portfolios are viewable by everyone" on public.portfolios;
create policy "Published portfolios are viewable by everyone"
  on public.portfolios for select
  using (is_published = true or auth.uid() = user_id);

-- The admin needs to read every portfolio and every profile to build the panel.
-- `is_admin()` is defined non-recursively so the policy can reference it safely.
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  );
$$;

drop policy if exists "Admins read all portfolios" on public.portfolios;
create policy "Admins read all portfolios"
  on public.portfolios for select
  using (public.is_admin());

drop policy if exists "Admins read all profiles" on public.profiles;
create policy "Admins read all profiles"
  on public.profiles for select
  using (public.is_admin());

-- 6. Keep profiles.updated_at honest.
create or replace function public.touch_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_profiles_updated_at();
