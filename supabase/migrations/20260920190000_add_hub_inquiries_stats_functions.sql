create or replace function public.hub_inquiries_by_project_stats(
  date_from timestamptz default null,
  date_to timestamptz default null
)
returns table (project_id text, count bigint)
language sql
stable
as $$
  select project_id, count(*)
  from public.hub_inquiries
  where (date_from is null or created_at >= date_from)
    and (date_to is null or created_at <= date_to)
  group by project_id
  order by count(*) desc;
$$;

create or replace function public.hub_inquiries_timeline_stats(
  granularity text default 'day',
  date_from timestamptz default null,
  date_to timestamptz default null
)
returns table (bucket timestamptz, count bigint)
language sql
stable
as $$
  select date_trunc(granularity, created_at) as bucket, count(*)
  from public.hub_inquiries
  where (date_from is null or created_at >= date_from)
    and (date_to is null or created_at <= date_to)
  group by 1
  order by 1;
$$;

grant execute on function public.hub_inquiries_by_project_stats(timestamptz, timestamptz) to service_role;
grant execute on function public.hub_inquiries_timeline_stats(text, timestamptz, timestamptz) to service_role;
