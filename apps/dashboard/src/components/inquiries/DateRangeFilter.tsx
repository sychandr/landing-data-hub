import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DateRangeFilterProps {
  dateFrom: string | undefined;
  dateTo: string | undefined;
  onApply: (range: { dateFrom?: string; dateTo?: string }) => void;
}

function parseDateParam(value: string | undefined): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function toDateOnlyIso(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function toEndOfDayIso(date: Date): string {
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay.toISOString();
}

function formatLabel(dateFrom: string | undefined, dateTo: string | undefined) {
  if (!dateFrom && !dateTo) return 'All dates';
  const from = dateFrom ? dateFrom.slice(0, 10) : '…';
  const to = dateTo ? dateTo.slice(0, 10) : '…';
  return `${from} – ${to}`;
}

export function DateRangeFilter({
  dateFrom,
  dateTo,
  onApply,
}: DateRangeFilterProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<DateRange | undefined>({
    from: parseDateParam(dateFrom),
    to: parseDateParam(dateTo),
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setDraft({ from: parseDateParam(dateFrom), to: parseDateParam(dateTo) });
    }
    setOpen(nextOpen);
  };

  const handleApply = () => {
    onApply({
      dateFrom: draft?.from ? toDateOnlyIso(draft.from) : undefined,
      dateTo: draft?.to ? toEndOfDayIso(draft.to) : undefined,
    });
    setOpen(false);
  };

  const handleClear = () => {
    setDraft(undefined);
    onApply({ dateFrom: undefined, dateTo: undefined });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          {formatLabel(dateFrom, dateTo)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={draft}
          onSelect={setDraft}
          numberOfMonths={2}
        />
        <div className="flex items-center justify-end gap-2 border-t border-border p-3">
          <Button variant="ghost" size="sm" onClick={handleClear}>
            Clear
          </Button>
          <Button size="sm" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
