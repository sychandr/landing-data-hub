import type { TimelineGranularity } from '@/types/inquiry';

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

const dayFormatter = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
});

const monthFormatter = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  year: 'numeric',
});

export function formatDateTime(iso: string): string {
  return dateTimeFormatter.format(new Date(iso));
}

export function formatBucketLabel(
  bucket: string,
  granularity: TimelineGranularity,
): string {
  const date = new Date(bucket);

  if (granularity === 'month') {
    return monthFormatter.format(date);
  }

  if (granularity === 'week') {
    const weekEnd = new Date(date);
    weekEnd.setDate(weekEnd.getDate() + 6);
    return `${dayFormatter.format(date)}–${dayFormatter.format(weekEnd)}`;
  }

  return dayFormatter.format(date);
}

export function truncate(value: string, maxLength: number): string {
  return value.length > maxLength
    ? `${value.slice(0, maxLength - 1)}…`
    : value;
}

export function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}
