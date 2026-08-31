create table if not exists contact_messages (
  id serial primary key,
  name text not null,
  email text not null,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_idx on contact_messages (created_at desc);
create index if not exists contact_messages_status_idx on contact_messages (status);
