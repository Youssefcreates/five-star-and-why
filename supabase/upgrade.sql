-- Run once in Supabase SQL Editor after the original schema.sql.
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(), title text not null,
  slug text unique not null, excerpt text not null default '', body text not null,
  published boolean not null default false, created_at timestamptz not null default now()
);
alter table public.posts enable row level security;
create policy "Published posts are public" on public.posts for select using (published=true or exists(select 1 from public.profiles p where p.id=auth.uid() and p.is_admin));
create policy "Admins create posts" on public.posts for insert with check (exists(select 1 from public.profiles p where p.id=auth.uid() and p.is_admin));
create policy "Admins update posts" on public.posts for update using (exists(select 1 from public.profiles p where p.id=auth.uid() and p.is_admin));
create policy "Admins delete posts" on public.posts for delete using (exists(select 1 from public.profiles p where p.id=auth.uid() and p.is_admin));
create policy "Admins see all reviews" on public.reviews for select using (exists(select 1 from public.profiles p where p.id=auth.uid() and p.is_admin));
create policy "Admins moderate reviews" on public.reviews for update using (exists(select 1 from public.profiles p where p.id=auth.uid() and p.is_admin));
update public.profiles set is_admin=true where id=(select id from auth.users where email='youssefyouwakim@ymail.com');
