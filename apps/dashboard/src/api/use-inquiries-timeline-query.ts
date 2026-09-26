import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  fetchInquiriesTimeline,
  type InquiriesTimelineParams,
} from '@/api/inquiries';
import { inquiriesKeys } from '@/api/query-keys';

export function useInquiriesTimelineQuery(params: InquiriesTimelineParams) {
  return useQuery({
    queryKey: inquiriesKeys.timeline(params),
    queryFn: () => fetchInquiriesTimeline(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
