import { useEffect, useState } from 'react';
import type {
  InquiriesFilters as InquiriesFiltersState,
  InquiriesFiltersPatch,
} from '@/hooks/useInquiriesFilters';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { Input } from '@/components/ui/input';
import { ProjectSelect } from '@/components/inquiries/ProjectSelect';
import { DateRangeFilter } from '@/components/inquiries/DateRangeFilter';

interface InquiriesFiltersProps {
  filters: InquiriesFiltersState;
  setFilters: (patch: InquiriesFiltersPatch) => void;
}

export function InquiriesFilters({
  filters,
  setFilters,
}: InquiriesFiltersProps) {
  const [searchInput, setSearchInput] = useState(filters.search ?? '');
  const debouncedSearch = useDebouncedValue(searchInput, 300);

  // Only re-run when the debounced value changes; `filters.search` and
  // `setFilters` are read, not depended on, to avoid fighting the user's
  // own typing.
  // biome-ignore lint/correctness/useExhaustiveDependencies: see comment above
  useEffect(() => {
    if (debouncedSearch !== (filters.search ?? '')) {
      setFilters({ search: debouncedSearch || undefined });
    }
  }, [debouncedSearch]);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Input
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        placeholder="Search name, email, or message…"
        className="max-w-xs"
        aria-label="Search inquiries"
      />
      <ProjectSelect
        value={filters.projectId}
        onChange={(projectId) => setFilters({ projectId })}
      />
      <DateRangeFilter
        dateFrom={filters.dateFrom}
        dateTo={filters.dateTo}
        onApply={(range) => setFilters(range)}
      />
    </div>
  );
}
