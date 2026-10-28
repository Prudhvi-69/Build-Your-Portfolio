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
