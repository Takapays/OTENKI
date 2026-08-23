-- Optional read-only queries for Supabase SQL Editor.

-- 1) Daily activity
select * from public.usage_daily_summary limit 30;

-- 2) Most selected mountains
select mountain, count(*) as analyses
from public.usage_events
where event_name = 'weather_analysis' and success is true and mountain is not null
  and created_at >= now() - interval '30 days'
group by mountain
order by analyses desc
limit 20;

-- 3) Slowest successful trail calculations
select created_at, mountain, duration_ms, route_points,
       metadata->>'distance_km' as distance_km,
       metadata->>'fallback_segments' as fallback_segments
from public.usage_events
where event_name = 'trail_route_calculated' and success is true
order by duration_ms desc nulls last
limit 50;

-- 4) Recent failures
select created_at, event_name, mountain, error_message, duration_ms
from public.usage_events
where success is false
order by created_at desc
limit 100;


-- 5) All selected/used route points (V1.4.11+)
select
  mountain,
  metadata->>'point_name' as point_name,
  metadata->>'point_type' as point_type,
  count(*) filter (where event_name='point_selected') as selected_count,
  count(*) filter (where event_name='route_point_used') as used_count,
  count(distinct session_id) as unique_sessions,
  max(created_at) as last_used
from public.usage_events
where event_name in ('point_selected','route_point_used')
group by mountain, metadata->>'point_name', metadata->>'point_type'
order by used_count desc, selected_count desc, mountain, point_name;

-- 6) All selected mountains (V1.4.11+)
select
  mountain,
  count(*) filter (where event_name='mountain_selected') as selected_count,
  count(*) filter (where event_name='weather_analysis' and success is true) as analysis_count,
  count(distinct session_id) as unique_sessions,
  max(created_at) as last_used
from public.usage_events
where mountain is not null
group by mountain
order by analysis_count desc, selected_count desc, mountain;
