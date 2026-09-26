drop function if exists public.hub_inquiries_timeline_stats(text, timestamptz, timestamptz);

create or replace function public.hub_inquiries_timeline_stats(
  granularity text default 'day',
  date_from timestamptz default null,
  date_to timestamptz default null,
  p_project_id text default null
)
returns table (bucket timestamptz, count bigint)
language sql
stable
as $$
  select date_trunc(granularity, created_at) as bucket, count(*)
  from public.hub_inquiries
  where (date_from is null or created_at >= date_from)
    and (date_to is null or created_at <= date_to)
    and (p_project_id is null or project_id = p_project_id)
  group by 1
  order by 1;
$$;

grant execute on function public.hub_inquiries_timeline_stats(text, timestamptz, timestamptz, text) to service_role;
