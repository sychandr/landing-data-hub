import type { FastifyReply, FastifyRequest } from 'fastify';
import { createInquirySchema } from '../schemas/inquiries.schema.js';
import { submitInquiry } from '../services/inquiries.service.js';

export async function createInquiryHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parsed = createInquirySchema.safeParse(request.body);

  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Invalid request body',
      issues: parsed.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  const inquiry = await submitInquiry(parsed.data);

  return reply.status(201).send(inquiry);
}
