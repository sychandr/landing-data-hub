import { useQuery } from '@tanstack/react-query';
import { fetchInquiriesByProject } from '@/api/inquiries';
import { inquiriesKeys } from '@/api/query-keys';

/** No dedicated /projects endpoint exists — derive the project list from
 * the by-project stats endpoint instead (called with no date filters). */
export function useProjectsQuery() {
  return useQuery({
    queryKey: inquiriesKeys.byProject(),
    queryFn: () => fetchInquiriesByProject(),
    staleTime: 5 * 60_000,
  });
}
