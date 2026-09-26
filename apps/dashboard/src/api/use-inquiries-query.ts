import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchInquiries, type ListInquiriesParams } from '@/api/inquiries';
import { inquiriesKeys } from '@/api/query-keys';

export function useInquiriesQuery(params: ListInquiriesParams) {
  return useQuery({
    queryKey: inquiriesKeys.list(params),
    queryFn: () => fetchInquiries(params),
    placeholderData: keepPreviousData,
    staleTime: 15_000,
  });
}
