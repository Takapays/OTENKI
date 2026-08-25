-- TRATEN V1.4.146: persistent nationwide weather cache
create table if not exists public.national_outlook_cache (
  cache_key text primary key,
  forecast_date date not null,
  engine text not null,
  mountain_name text not null,
  lat double precision not null,
  lon double precision not null,
  elevation integer,
  result jsonb not null,
  generated_at timestamptz not null default now(),
  generated_ts double precision not null,
  fresh_until double precision not null,
  stale_until double precision not null,
  app_version text
);
create index if not exists national_outlook_cache_date_engine_idx
  on public.national_outlook_cache (forecast_date, engine);
create index if not exists national_outlook_cache_stale_idx
  on public.national_outlook_cache (stale_until);
alter table public.national_outlook_cache enable row level security;
-- No public policy is required: the app server uses the service-role/secret key.

-- Verification after first nationwide run:
-- select forecast_date, engine, count(*) as cached_mountains,
--        min(to_timestamp(generated_ts)) as oldest_generated,
--        max(to_timestamp(generated_ts)) as newest_generated
-- from public.national_outlook_cache
-- group by forecast_date, engine
-- order by forecast_date desc;
