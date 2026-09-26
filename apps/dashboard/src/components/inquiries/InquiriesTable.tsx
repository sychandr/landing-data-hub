import { useMemo } from 'react';
import { useTable } from '@tanstack/react-table';
import { useInquiriesQuery } from '@/api/use-inquiries-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import {
  createInquiriesColumns,
  inquiriesTableFeatures,
} from '@/components/inquiries/inquiries-columns';
import { InquiriesTablePagination } from '@/components/inquiries/InquiriesTablePagination';
import type {
  InquiriesFilters,
  InquiriesFiltersPatch,
} from '@/hooks/useInquiriesFilters';
import type { Inquiry, InquirySortBy } from '@/types/inquiry';

const EMPTY_ROWS: Inquiry[] = [];

interface InquiriesTableProps {
  filters: InquiriesFilters;
  setFilters: (patch: InquiriesFiltersPatch) => void;
}

export function InquiriesTable({ filters, setFilters }: InquiriesTableProps) {
  const offset = (filters.page - 1) * filters.limit;

  const { data, isLoading, isFetching } = useInquiriesQuery({
    projectId: filters.projectId,
    search: filters.search,
    dateFrom: filters.dateFrom,
    dateTo: filters.dateTo,
    sortBy: filters.sortBy,
    sortDir: filters.sortDir,
    limit: filters.limit,
    offset,
  });

  const handleSortChange = (nextSortBy: InquirySortBy) => {
    if (filters.sortBy === nextSortBy) {
      setFilters({ sortDir: filters.sortDir === 'asc' ? 'desc' : 'asc' });
    } else {
      setFilters({ sortBy: nextSortBy, sortDir: 'desc' });
    }
  };

  // handleSortChange only closes over setFilters/filters.sortDir, already
  // covered by the two listed deps.
  // biome-ignore lint/correctness/useExhaustiveDependencies: see comment above
  const columns = useMemo(
    () =>
      createInquiriesColumns({
        sortBy: filters.sortBy,
        sortDir: filters.sortDir,
        onSortChange: handleSortChange,
      }),
    [filters.sortBy, filters.sortDir],
  );

  const table = useTable({
    features: inquiriesTableFeatures,
    columns,
    data: data?.data ?? EMPTY_ROWS,
  });

  const rows = table.getRowModel().rows;
  const skeletonRowCount = Math.min(filters.limit, 10);

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Static placeholder rows: fixed count, never reordered.
              Array.from({ length: skeletonRowCount }).map((_, rowIndex) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static placeholder rows, never reordered
                <TableRow key={`skeleton-row-${rowIndex}`}>
                  {columns.map((_, columnIndex) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: same fixed, static column list every render
                    <TableCell key={`skeleton-cell-${columnIndex}`}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-8 text-center text-muted-foreground"
                >
                  No inquiries match these filters.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={isFetching ? 'opacity-60' : undefined}
                >
                  {row.getAllCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <InquiriesTablePagination
        filters={filters}
        setFilters={setFilters}
        total={data?.pagination.total ?? 0}
      />
    </div>
  );
}
