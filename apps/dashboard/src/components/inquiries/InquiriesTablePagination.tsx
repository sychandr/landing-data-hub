import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type {
  InquiriesFilters,
  InquiriesFiltersPatch,
} from '@/hooks/useInquiriesFilters';

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

interface InquiriesTablePaginationProps {
  filters: InquiriesFilters;
  setFilters: (patch: InquiriesFiltersPatch) => void;
  total: number;
}

export function InquiriesTablePagination({
  filters,
  setFilters,
  total,
}: InquiriesTablePaginationProps) {
  const { page, limit } = filters;
  const startRow = total === 0 ? 0 : (page - 1) * limit + 1;
  const endRow = Math.min(page * limit, total);
  const pageCount = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <span>Rows per page</span>
        <Select
          value={String(limit)}
          onValueChange={(value) =>
            setFilters({ limit: Number(value), page: 1 })
          }
        >
          <SelectTrigger aria-label="Rows per page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAGE_SIZE_OPTIONS.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <span>
        {startRow}–{endRow} of {total}
      </span>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          disabled={page <= 1}
          onClick={() => setFilters({ page: page - 1 })}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          disabled={page >= pageCount}
          onClick={() => setFilters({ page: page + 1 })}
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
