import { apiGet } from '@/api/client';
import type {
  InquiriesListResponse,
  InquirySortBy,
  InquiryProjectStats,
  InquiryTimelineStats,
  SortDir,
  TimelineGranularity,
} from '@/types/inquiry';

export interface ListInquiriesParams {
  projectId?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy: InquirySortBy;
  sortDir: SortDir;
  limit: number;
  offset: number;
}

export function fetchInquiries(
  params: ListInquiriesParams,
): Promise<InquiriesListResponse> {
  return apiGet<InquiriesListResponse>('/inquiries', { ...params });
}

export interface InquiriesScopeParams {
  projectId?: string;
  dateFrom?: string;
  dateTo?: string;
}

export function fetchInquiriesByProject(
  params: InquiriesScopeParams = {},
): Promise<InquiryProjectStats[]> {
  return apiGet<InquiryProjectStats[]>('/inquiries/stats/by-project', {
    ...params,
  });
}

export interface InquiriesTimelineParams extends InquiriesScopeParams {
  granularity: TimelineGranularity;
}

export function fetchInquiriesTimeline(
  params: InquiriesTimelineParams,
): Promise<InquiryTimelineStats[]> {
  return apiGet<InquiryTimelineStats[]>('/inquiries/stats/timeline', {
    ...params,
  });
}
