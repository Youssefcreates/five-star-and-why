-- Run this entire file in Supabase > SQL Editor > New query.
create type public.review_status as enum ('draft','pending','published','rejected');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  bio text not null default '',
  avatar_url text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null check (char_length(title) between 3 and 120),
  item_name text not null,
  category text not null check (category in ('Places','Movies','Food','Books','Travel','Products')),
  rating int not null check (rating between 1 and 5),
  body text not null check (char_length(body) >= 50),
  image_url text,
  status public.review_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.saved_reviews (
  user_id uuid references public.profiles(id) on delete cascade,
  review_id uuid references public.reviews(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id,review_id)
);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin insert into public.profiles(id,display_name) values(new.id,coalesce(new.raw_user_meta_data->>'display_name','')); return new; end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.reviews enable row level security;
alter table public.saved_reviews enable row level security;

create policy "Profiles are public" on public.profiles for select using (true);
create policy "Users update own profile" on public.profiles for update using (auth.uid()=id);
create policy "Published reviews are public" on public.reviews for select using (status='published' or auth.uid()=user_id);
create policy "Users create own reviews" on public.reviews for insert with check (auth.uid()=user_id);
create policy "Users update own unpublished reviews" on public.reviews for update using (auth.uid()=user_id and status in ('draft','pending'));
create policy "Users delete own unpublished reviews" on public.reviews for delete using (auth.uid()=user_id and status in ('draft','pending'));
create policy "Users see own saves" on public.saved_reviews for select using (auth.uid()=user_id);
create policy "Users save reviews" on public.saved_reviews for insert with check (auth.uid()=user_id);
create policy "Users remove saves" on public.saved_reviews for delete using (auth.uid()=user_id);

create index reviews_status_created_idx on public.reviews(status,created_at desc);
create index reviews_category_idx on public.reviews(category);

