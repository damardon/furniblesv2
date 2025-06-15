
-- 1. Create storage bucket for product files (public access, rely on dashboard for fine-grain file policy)
insert into storage.buckets (id, name, public) values ('product-files', 'product-files', true);

-- 2. Create notifications table
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  type text not null,
  title text not null,
  body text,
  read boolean default false,
  created_at timestamp with time zone default now()
);

alter table public.notifications enable row level security;

create policy "Can view own notifications"
  on public.notifications for select
  using (user_id = auth.uid());

create policy "Can insert own notifications"
  on public.notifications for insert
  with check (user_id = auth.uid());

create policy "Can update read status"
  on public.notifications for update
  using (user_id = auth.uid());

-- 3. Create messages table for chat
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid not null,
  sender_id uuid references auth.users on delete cascade not null,
  receiver_id uuid references auth.users on delete cascade not null,
  content text not null,
  sent_at timestamp with time zone default now()
);

alter table public.messages enable row level security;

create policy "Can view own chats"
  on public.messages for select
  using (sender_id = auth.uid() or receiver_id = auth.uid());

create policy "Can send messages"
  on public.messages for insert 
  with check (sender_id = auth.uid());

-- Index for chat retrieval
create index on public.messages(chat_id, sent_at);
