import {
  createInquiry,
  getInquiriesByProjectStats as fetchInquiriesByProjectStats,
  getInquiriesTimelineStats as fetchInquiriesTimelineStats,
  type Inquiry,
  type InquiryProjectStats,
  type InquiryTimelineStats,
  listInquiries,
  type ListInquiriesResult,
} from '../repositories/inquiries.repository.js';
import type {
  CreateInquiryBody,
  InquiriesStatsQuery,
  InquiriesTimelineQuery,
  ListInquiriesQuery,
} from '../schemas/inquiries.schema.js';

export async function submitInquiry(
  input: CreateInquiryBody,
): Promise<Inquiry> {
  return createInquiry(input);
}

export async function getInquiries(
  query: ListInquiriesQuery,
): Promise<ListInquiriesResult> {
  return listInquiries(query);
}

export async function getInquiriesByProjectStats(
  query: InquiriesStatsQuery,
): Promise<InquiryProjectStats[]> {
  return fetchInquiriesByProjectStats(query);
}

export async function getInquiriesTimeline(
  query: InquiriesTimelineQuery,
): Promise<InquiryTimelineStats[]> {
  return fetchInquiriesTimelineStats(query);
}
