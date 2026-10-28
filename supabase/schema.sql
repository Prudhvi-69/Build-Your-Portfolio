-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- profiles table extends auth.users
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz default now() not null
);

-- portfolios table
create table if not exists public.portfolios (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  slug text unique not null,
  title text default 'My Portfolio' not null,
  bio text default '' not null,
  avatar_url text,
  skills jsonb default '[]'::jsonb not null,
  projects jsonb default '[]'::jsonb not null,
  experience jsonb default '[]'::jsonb not null,
  education jsonb default '[]'::jsonb not null,
  social_links jsonb default '{}'::jsonb not null,
  is_published boolean default true not null,
  updated_at timestamptz default now() not null
);

create index if not exists portfolios_user_id_idx on public.portfolios(user_id);
create index if not exists portfolios_slug_idx on public.portfolios(slug);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.portfolios enable row level security;

-- Profiles: users can read all profiles, update their own
create policy "Profiles are viewable by everyone"
  on public.profiles for select
  using ( true );

create policy "Users can update own profile"
  on public.portfolios for all
  using ( auth.uid() = user_id )
  with check ( auth.uid() = user_id );

-- Portfolios: published ones are public; owners manage their own
create policy "Published portfolios are viewable by everyone"
  on public.portfolios for select
  using ( is_published = true );

create policy "Users can manage own portfolios"
  on public.portfolios for all
  using ( auth.uid() = user_id )
  with check ( auth.uid() = user_id );
