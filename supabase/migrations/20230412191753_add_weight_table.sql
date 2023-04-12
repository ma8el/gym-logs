create table weight (
  id serial,
  user_id uuid references profiles(id),
  weight float,
  created_at timestamptz default now()
);

alter table weight
  enable row level security;

create policy "Weigths are viewable by user." on weight
  for select using (auth.uid() = user_id);

create policy "Users can insert weigths." on weight
  for insert with check (
    auth.uid() in (
      select id from profiles
    )
);

create policy "Users can update own weight." on weight
  for update using (auth.uid() = user_id);