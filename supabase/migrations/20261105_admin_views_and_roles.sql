-- ONE-PASTE MIGRATION (idempotent — safe to run repeatedly).
--
-- This single file brings a database up to date whether you already ran the two
-- 20261028 migrations or not. It folds in their steps (the template column and
-- the owner policies) so the SQL editor needs exactly one paste.
--
-- Run it in Supabase -> SQL Editor -> New query -> Run.

-- ---------------------------------------------------------------------------
-- 0. Prerequisite from 20261028_add_portfolio_template.sql
-- ---------------------------------------------------------------------------
alter table public.portfolios
  add column if not exists template text not null default 'konoha-ink';

-- ---------------------------------------------------------------------------
-- 1. Owner policies from 20261028_fix_profile_creation.sql
-- ---------------------------------------------------------------------------
drop policy if exists "Users can update own profile" on public.portfolios;
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Users can manage own portfolios" on public.portfolios;
create policy "Users can manage own portfolios"
  on public.portfolios for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- 2. Role, profile metadata
-- ---------------------------------------------------------------------------
alter table public.profiles
  add column if not exists role text not null default 'user',
  add column if not exists bio text,
  add column if not exists website text,
  add column if not exists updated_at timestamptz not null default now();

alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles
  add constraint profiles_role_check check (role in ('user', 'admin'));

-- Older rows may predate the constraint; normalise anything unexpected.
update public.profiles set role = 'user' where role is null or role not in ('user', 'admin');

-- ---------------------------------------------------------------------------
-- 3. Visit counters
-- ---------------------------------------------------------------------------
alter table public.portfolios
  add column if not exists view_count bigint not null default 0,
  add column if not exists last_viewed_at timestamptz;

create table if not exists public.portfolio_visits (
  id bigint generated always as identity primary key,
  portfolio_id uuid references public.portfolios(id) on delete cascade not null,
  slug text not null,
  viewed_on date not null default current_date,
  created_at timestamptz not null default now()
);

create index if not exists portfolio_visits_portfolio_idx
  on public.portfolio_visits(portfolio_id, created_at desc);
create index if not exists portfolio_visits_slug_idx
  on public.portfolio_visits(slug);

-- ---------------------------------------------------------------------------
-- 4. Record a view. SECURITY DEFINER so an anonymous visitor can count a visit
--    without being granted UPDATE on portfolios (which would let them rewrite
--    someone else's content).
-- ---------------------------------------------------------------------------
create or replace function public.record_portfolio_view(portfolio_slug text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  target_id uuid;
begin
  select id into target_id
    from public.portfolios
   where slug = portfolio_slug
     and is_published = true;

  if target_id is null then
    return;
  end if;

  update public.portfolios
     set view_count = view_count + 1,
         last_viewed_at = now()
   where id = target_id;

  insert into public.portfolio_visits (portfolio_id, slug)
  values (target_id, portfolio_slug);
end;
$$;

revoke all on function public.record_portfolio_view(text) from public;
grant execute on function public.record_portfolio_view(text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- 5. is_admin(), written without touching profiles from inside its own policy
--    so the policy cannot recurse.
-- ---------------------------------------------------------------------------
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

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- ---------------------------------------------------------------------------
-- 6. Read policies: owners always see their own drafts; admins see everything.
-- ---------------------------------------------------------------------------
drop policy if exists "Published portfolios are viewable by everyone" on public.portfolios;
create policy "Published portfolios are viewable by everyone"
  on public.portfolios for select
  using (is_published = true or auth.uid() = user_id);

drop policy if exists "Admins read all portfolios" on public.portfolios;
create policy "Admins read all portfolios"
  on public.portfolios for select
  using (public.is_admin());

drop policy if exists "Admins read all profiles" on public.profiles;
create policy "Admins read all profiles"
  on public.profiles for select
  using (public.is_admin());

-- The admin panel also needs the raw visit log.
alter table public.portfolio_visits enable row level security;

drop policy if exists "Admins read all visits" on public.portfolio_visits;
create policy "Admins read all visits"
  on public.portfolio_visits for select
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- 7. Keep profiles.updated_at honest.
-- ---------------------------------------------------------------------------
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

-- ---------------------------------------------------------------------------
-- 8. Confirm. Both columns should read "ok".
-- ---------------------------------------------------------------------------
select
  'profiles.role' as check_name,
  case when exists (
    select 1 from information_schema.columns
     where table_schema = 'public' and table_name = 'profiles' and column_name = 'role'
  ) then 'ok' else 'MISSING' end as status
union all
select
  'portfolios.view_count',
  case when exists (
    select 1 from information_schema.columns
     where table_schema = 'public' and table_name = 'portfolios' and column_name = 'view_count'
  ) then 'ok' else 'MISSING' end
union all
select
  'portfolio_visits table',
  case when exists (
    select 1 from information_schema.tables
     where table_schema = 'public' and table_name = 'portfolio_visits'
  ) then 'ok' else 'MISSING' end;
