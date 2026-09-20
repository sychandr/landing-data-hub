import { supabase } from '../lib/supabase.js';

interface InquiryRow {
  id: string;
  project_id: string;
  name: string;
  email: string;
  message: string;
  phone: string | null;
  source_url: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface Inquiry {
  id: string;
  projectId: string;
  name: string;
  email: string;
  message: string;
  phone: string | null;
  sourceUrl: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface CreateInquiryInput {
  projectId: string;
  name: string;
  email: string;
  message: string;
  phone?: string | null;
  sourceUrl: string;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmTerm?: string | null;
  utmContent?: string | null;
  metadata?: Record<string, unknown>;
}

export interface ListInquiriesFilters {
  projectId?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: 'createdAt' | 'name' | 'email' | 'projectId';
  sortDir?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface ListInquiriesResult {
  data: Inquiry[];
  total: number;
}

export interface InquiryProjectStats {
  projectId: string;
  count: number;
}

export interface InquiryTimelineStats {
  bucket: string;
  count: number;
}

const SORT_COLUMNS: Record<
  NonNullable<ListInquiriesFilters['sortBy']>,
  string
> = {
  createdAt: 'created_at',
  name: 'name',
  email: 'email',
  projectId: 'project_id',
};

function toInquiry(row: InquiryRow): Inquiry {
  return {
    id: row.id,
    projectId: row.project_id,
    name: row.name,
    email: row.email,
    message: row.message,
    phone: row.phone,
    sourceUrl: row.source_url,
    utmSource: row.utm_source,
    utmMedium: row.utm_medium,
    utmCampaign: row.utm_campaign,
    utmTerm: row.utm_term,
    utmContent: row.utm_content,
    metadata: row.metadata,
    createdAt: row.created_at,
  };
}

export async function createInquiry(
  input: CreateInquiryInput,
): Promise<Inquiry> {
  const { data, error } = await supabase
    .from('hub_inquiries')
    .insert({
      project_id: input.projectId,
      name: input.name,
      email: input.email,
      message: input.message,
      phone: input.phone ?? null,
      source_url: input.sourceUrl,
      utm_source: input.utmSource ?? null,
      utm_medium: input.utmMedium ?? null,
      utm_campaign: input.utmCampaign ?? null,
      utm_term: input.utmTerm ?? null,
      utm_content: input.utmContent ?? null,
      metadata: input.metadata ?? {},
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create inquiry: ${error.message}`);
  }

  return toInquiry(data);
}

export async function listInquiries({
  projectId,
  search,
  dateFrom,
  dateTo,
  sortBy = 'createdAt',
  sortDir = 'desc',
  limit = 50,
  offset = 0,
}: ListInquiriesFilters = {}): Promise<ListInquiriesResult> {
  let query = supabase.from('hub_inquiries').select('*', { count: 'exact' });

  if (projectId) {
    query = query.eq('project_id', projectId);
  }

  if (search) {
    // Quoted so commas/parentheses in user input can't break out of the
    // PostgREST `.or()` filter syntax and inject extra filter clauses.
    const escaped = search.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    const pattern = `"%${escaped}%"`;
    query = query.or(
      `name.ilike.${pattern},email.ilike.${pattern},message.ilike.${pattern}`,
    );
  }

  if (dateFrom) {
    query = query.gte('created_at', dateFrom);
  }

  if (dateTo) {
    query = query.lte('created_at', dateTo);
  }

  const { data, error, count } = await query
    .order(SORT_COLUMNS[sortBy], { ascending: sortDir === 'asc' })
    .range(offset, offset + limit - 1);

  if (error) {
    throw new Error(`Failed to list inquiries: ${error.message}`);
  }

  return { data: data.map(toInquiry), total: count ?? 0 };
}

export async function getInquiriesByProjectStats({
  dateFrom,
  dateTo,
}: {
  dateFrom?: string;
  dateTo?: string;
} = {}): Promise<InquiryProjectStats[]> {
  const { data, error } = await supabase.rpc('hub_inquiries_by_project_stats', {
    date_from: dateFrom ?? null,
    date_to: dateTo ?? null,
  });

  if (error) {
    throw new Error(`Failed to load inquiries stats by project: ${error.message}`);
  }

  return (data ?? []).map((row: { project_id: string; count: number }) => ({
    projectId: row.project_id,
    count: row.count,
  }));
}

export async function getInquiriesTimelineStats({
  granularity = 'day',
  dateFrom,
  dateTo,
}: {
  granularity?: 'day' | 'week' | 'month';
  dateFrom?: string;
  dateTo?: string;
} = {}): Promise<InquiryTimelineStats[]> {
  const { data, error } = await supabase.rpc('hub_inquiries_timeline_stats', {
    granularity,
    date_from: dateFrom ?? null,
    date_to: dateTo ?? null,
  });

  if (error) {
    throw new Error(`Failed to load inquiries timeline stats: ${error.message}`);
  }

  return (data ?? []).map((row: { bucket: string; count: number }) => ({
    bucket: row.bucket,
    count: row.count,
  }));
}
