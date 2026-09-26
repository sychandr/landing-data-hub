import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useInquiriesTimelineQuery } from '@/api/use-inquiries-timeline-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { formatBucketLabel } from '@/lib/format';
import type { TimelineGranularity } from '@/types/inquiry';

interface InquiriesChartProps {
  projectId: string | undefined;
  dateFrom: string | undefined;
  dateTo: string | undefined;
}

interface TooltipPayloadEntry {
  value: number;
  payload: { bucket: string };
}

function ChartTooltip({
  active,
  payload,
  granularity,
}: {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  granularity: TimelineGranularity;
}) {
  if (!active || !payload?.length) return null;
  const [entry] = payload;

  return (
    <div className="rounded-md border border-border bg-popover px-3 py-2 text-sm text-popover-foreground shadow-md">
      <div className="font-semibold">{entry.value}</div>
      <div className="text-muted-foreground">
        {formatBucketLabel(entry.payload.bucket, granularity)}
      </div>
    </div>
  );
}

export function InquiriesChart({
  projectId,
  dateFrom,
  dateTo,
}: InquiriesChartProps) {
  const [granularity, setGranularity] = useState<TimelineGranularity>('day');

  const { data, isLoading } = useInquiriesTimelineQuery({
    projectId,
    dateFrom,
    dateTo,
    granularity,
  });

  const hasData = (data?.length ?? 0) > 0;

  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>Inquiries over time</CardTitle>
          <CardDescription>
            Reflects the selected project &amp; date range, not the current
            table page.
          </CardDescription>
        </div>
        <Select
          value={granularity}
          onValueChange={(value) =>
            setGranularity(value as TimelineGranularity)
          }
        >
          <SelectTrigger aria-label="Chart granularity">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Day</SelectItem>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-64 w-full" />
        ) : !hasData ? (
          <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
            No data for this range.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={256}>
            <BarChart data={data} barCategoryGap="20%">
              <CartesianGrid
                vertical={false}
                stroke="var(--border)"
                strokeDasharray="0"
              />
              <XAxis
                dataKey="bucket"
                tickFormatter={(value: string) =>
                  formatBucketLabel(value, granularity)
                }
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                axisLine={{ stroke: 'var(--border)' }}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={32}
              />
              <Tooltip
                content={<ChartTooltip granularity={granularity} />}
                cursor={{ fill: 'var(--muted)' }}
              />
              <Bar
                dataKey="count"
                fill="var(--primary)"
                radius={[4, 4, 0, 0]}
                maxBarSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
