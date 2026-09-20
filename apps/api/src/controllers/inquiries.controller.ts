import type { FastifyReply, FastifyRequest } from 'fastify';
import {
  createInquirySchema,
  inquiriesStatsQuerySchema,
  inquiriesTimelineQuerySchema,
  listInquiriesQuerySchema,
} from '../schemas/inquiries.schema.js';
import {
  getInquiries,
  getInquiriesByProjectStats,
  getInquiriesTimeline,
  submitInquiry,
} from '../services/inquiries.service.js';

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

export async function listInquiriesHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parsed = listInquiriesQuerySchema.safeParse(request.query);

  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Invalid query parameters',
      issues: parsed.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  const { data, total } = await getInquiries(parsed.data);

  return reply.status(200).send({
    data,
    pagination: {
      total,
      limit: parsed.data.limit,
      offset: parsed.data.offset,
    },
  });
}

export async function getInquiriesByProjectStatsHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parsed = inquiriesStatsQuerySchema.safeParse(request.query);

  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Invalid query parameters',
      issues: parsed.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  const stats = await getInquiriesByProjectStats(parsed.data);

  return reply.status(200).send(stats);
}

export async function getInquiriesTimelineHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parsed = inquiriesTimelineQuerySchema.safeParse(request.query);

  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Invalid query parameters',
      issues: parsed.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  const stats = await getInquiriesTimeline(parsed.data);

  return reply.status(200).send(stats);
}
