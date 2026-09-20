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
