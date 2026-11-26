-- Dropi concept demo: public, fictional leaderboard content only.
-- Run in a new dedicated Supabase project. No personal or health records.
begin;
create table if not exists public.dropi_demo_content (
  id text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.dropi_demo_content enable row level security;
revoke all on public.dropi_demo_content from anon, authenticated;
grant select on public.dropi_demo_content to anon, authenticated;
drop policy if exists "Read public fictional demo" on public.dropi_demo_content;
create policy "Read public fictional demo"
  on public.dropi_demo_content for select to anon, authenticated
  using (id = 'public-demo');
insert into public.dropi_demo_content (id,content) values (
  'public-demo',
  '{"teams":[["Frederiksberg Fællesskab","FF",92,"12 / 13","green"],["CBS Gives","CG",86,"12 / 14","purple"],["Nørrebro Runners","NR",80,"8 / 10",""],["Sparta Together","ST",75,"9 / 12","blue"],["Team Amager","TA",67,"8 / 12","green"]]}'::jsonb
) on conflict (id) do nothing;
commit;
