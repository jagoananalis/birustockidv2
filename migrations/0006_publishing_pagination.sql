-- Unified publishing lifecycle for public content.
alter table analisis
  add column if not exists status text not null default 'PUBLISHED';

alter table news
  add column if not exists status text not null default 'PUBLISHED';

alter table edukasi
  add column if not exists status text not null default 'PUBLISHED',
  add column if not exists published_at date not null default current_date,
  add column if not exists updated_at timestamptz not null default now();

-- Normalize any unexpected legacy values before enforcing the public contract.
update analisis set status = 'PUBLISHED' where status not in ('DRAFT', 'PUBLISHED', 'SCHEDULED', 'ARCHIVED');
update news set status = 'PUBLISHED' where status not in ('DRAFT', 'PUBLISHED', 'SCHEDULED', 'ARCHIVED');
update edukasi set status = 'PUBLISHED' where status not in ('DRAFT', 'PUBLISHED', 'SCHEDULED', 'ARCHIVED');

create index if not exists analisis_public_feed_idx on analisis (status, published_at desc, id desc);
create index if not exists news_public_feed_idx on news (status, published_at desc, id desc);
create index if not exists edukasi_public_feed_idx on edukasi (status, published_at desc, id desc);

-- Existing content remains visible after introducing the workflow.
update analisis set status = 'PUBLISHED' where status is null;
update news set status = 'PUBLISHED' where status is null;
update edukasi set status = 'PUBLISHED' where status is null;

