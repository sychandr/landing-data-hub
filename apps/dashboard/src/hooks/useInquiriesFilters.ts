import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import type { InquirySortBy, SortDir } from '@/types/inquiry';

export interface InquiriesFilters {
  projectId?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  sortBy: InquirySortBy;
  sortDir: SortDir;
  page: number;
  limit: number;
}

const DEFAULT_SORT_BY: InquirySortBy = 'createdAt';
const DEFAULT_SORT_DIR: SortDir = 'desc';
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;

const SORT_BY_VALUES: InquirySortBy[] = [
  'createdAt',
  'name',
  'email',
  'projectId',
];

function parseSortBy(value: string | null): InquirySortBy {
  return (SORT_BY_VALUES as string[]).includes(value ?? '')
    ? (value as InquirySortBy)
    : DEFAULT_SORT_BY;
}

function parseSortDir(value: string | null): SortDir {
  return value === 'asc' ? 'asc' : DEFAULT_SORT_DIR;
}

function parsePositiveInt(value: string | null, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export type InquiriesFiltersPatch = Partial<InquiriesFilters>;

export function useInquiriesFilters() {
  const [params, setParams] = useSearchParams();

  const filters: InquiriesFilters = useMemo(
    () => ({
      projectId: params.get('projectId') ?? undefined,
      dateFrom: params.get('dateFrom') ?? undefined,
      dateTo: params.get('dateTo') ?? undefined,
      search: params.get('search') ?? undefined,
      sortBy: parseSortBy(params.get('sortBy')),
      sortDir: parseSortDir(params.get('sortDir')),
      page: parsePositiveInt(params.get('page'), DEFAULT_PAGE),
      limit: parsePositiveInt(params.get('limit'), DEFAULT_LIMIT),
    }),
    [params],
  );

  const setFilters = useCallback(
    (patch: InquiriesFiltersPatch) => {
      setParams((prev) => {
        const next = new URLSearchParams(prev);

        for (const [key, value] of Object.entries(patch)) {
          if (value === undefined || value === '') {
            next.delete(key);
          } else {
            next.set(key, String(value));
          }
        }

        // Any filter change other than the page itself resets pagination.
        if (!('page' in patch)) {
          next.set('page', String(DEFAULT_PAGE));
        }

        return next;
      });
    },
    [setParams],
  );

  return { filters, setFilters };
}
