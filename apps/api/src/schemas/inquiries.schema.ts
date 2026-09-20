import { z } from 'zod';

export const createInquirySchema = z.object({
  projectId: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
  phone: z.string().min(1).nullish(),
  sourceUrl: z.string().url(),
  utmSource: z.string().nullish(),
  utmMedium: z.string().nullish(),
  utmCampaign: z.string().nullish(),
  utmTerm: z.string().nullish(),
  utmContent: z.string().nullish(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type CreateInquiryBody = z.infer<typeof createInquirySchema>;

export const listInquiriesQuerySchema = z.object({
  projectId: z.string().min(1).optional(),
  search: z.string().min(1).optional(),
  dateFrom: z.string().min(1).optional(),
  dateTo: z.string().min(1).optional(),
  sortBy: z
    .enum(['createdAt', 'name', 'email', 'projectId'])
    .default('createdAt'),
  sortDir: z.enum(['asc', 'desc']).default('desc'),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
});

export type ListInquiriesQuery = z.infer<typeof listInquiriesQuerySchema>;

export const inquiriesStatsQuerySchema = z.object({
  dateFrom: z.string().min(1).optional(),
  dateTo: z.string().min(1).optional(),
});

export type InquiriesStatsQuery = z.infer<typeof inquiriesStatsQuerySchema>;

export const inquiriesTimelineQuerySchema = inquiriesStatsQuerySchema.extend({
  granularity: z.enum(['day', 'week', 'month']).default('day'),
});

export type InquiriesTimelineQuery = z.infer<typeof inquiriesTimelineQuerySchema>;
