import { createColumnHelper, tableFeatures } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDateTime, hostnameOf, truncate } from '@/lib/format';
import type { Inquiry, InquirySortBy, SortDir } from '@/types/inquiry';

// No client-side sorting/filtering/pagination is registered: the API does
// all of that server-side, and the table only renders whatever page of
// rows it was given. Core row/header models work without any extra
// feature registration.
export const inquiriesTableFeatures = tableFeatures({});

const columnHelper = createColumnHelper<
  typeof inquiriesTableFeatures,
  Inquiry
>();

interface SortableHeaderProps {
  label: string;
  columnKey: InquirySortBy;
  activeSortBy: InquirySortBy;
  sortDir: SortDir;
  onSortChange: (columnKey: InquirySortBy) => void;
}

function SortableHeader({
  label,
  columnKey,
  activeSortBy,
  sortDir,
  onSortChange,
}: SortableHeaderProps) {
  const isActive = activeSortBy === columnKey;
  const Icon = isActive
    ? sortDir === 'asc'
      ? ArrowUp
      : ArrowDown
    : ArrowUpDown;

  return (
    <button
      type="button"
      onClick={() => onSortChange(columnKey)}
      className="inline-flex items-center gap-1 font-medium hover:text-foreground"
    >
      {label}
      <Icon className={isActive ? 'size-3.5' : 'size-3.5 opacity-40'} />
    </button>
  );
}

interface CreateInquiriesColumnsArgs {
  sortBy: InquirySortBy;
  sortDir: SortDir;
  onSortChange: (columnKey: InquirySortBy) => void;
}

export function createInquiriesColumns({
  sortBy,
  sortDir,
  onSortChange,
}: CreateInquiriesColumnsArgs) {
  function sortableHeader(label: string, columnKey: InquirySortBy) {
    return () => (
      <SortableHeader
        label={label}
        columnKey={columnKey}
        activeSortBy={sortBy}
        sortDir={sortDir}
        onSortChange={onSortChange}
      />
    );
  }

  return columnHelper.columns([
    columnHelper.accessor('projectId', {
      header: sortableHeader('Project', 'projectId'),
      cell: (info) => <Badge variant="outline">{info.getValue()}</Badge>,
    }),
    columnHelper.accessor('name', {
      header: sortableHeader('Name', 'name'),
    }),
    columnHelper.accessor('email', {
      header: sortableHeader('Email', 'email'),
    }),
    columnHelper.accessor('message', {
      header: 'Message',
      cell: (info) => (
        <span title={info.getValue()}>{truncate(info.getValue(), 80)}</span>
      ),
    }),
    columnHelper.accessor('createdAt', {
      header: sortableHeader('Received', 'createdAt'),
      cell: (info) => formatDateTime(info.getValue()),
    }),
    columnHelper.accessor('sourceUrl', {
      header: 'Source',
      cell: (info) => (
        <a
          href={info.getValue()}
          target="_blank"
          rel="noreferrer"
          className="text-primary hover:underline"
        >
          {hostnameOf(info.getValue())}
        </a>
      ),
    }),
  ]);
}
