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

export interface InquiriesListResponse {
  data: Inquiry[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
}

export interface InquiryProjectStats {
  projectId: string;
  count: number;
}

export interface InquiryTimelineStats {
  bucket: string;
  count: number;
}

export type InquirySortBy = 'createdAt' | 'name' | 'email' | 'projectId';
export type SortDir = 'asc' | 'desc';
export type TimelineGranularity = 'day' | 'week' | 'month';
