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

interface PageOptions {
  limit?: number;
  offset?: number;
}

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
  limit = 50,
  offset = 0,
}: PageOptions = {}): Promise<Inquiry[]> {
  const { data, error } = await supabase
    .from('hub_inquiries')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    throw new Error(`Failed to list inquiries: ${error.message}`);
  }

  return data.map(toInquiry);
}

export async function listInquiriesByProject(
  projectId: string,
  { limit = 50, offset = 0 }: PageOptions = {},
): Promise<Inquiry[]> {
  const { data, error } = await supabase
    .from('hub_inquiries')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    throw new Error(
      `Failed to list inquiries for project ${projectId}: ${error.message}`,
    );
  }

  return data.map(toInquiry);
}
