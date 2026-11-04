-- Adds the template a portfolio is published with.
-- Existing portfolios fall back to the default template, so this is safe to run
-- against a populated database.

alter table public.portfolios
  add column if not exists template text not null default 'konoha-ink';
