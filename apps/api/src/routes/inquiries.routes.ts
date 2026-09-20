import type { FastifyInstance } from 'fastify';
import { createInquiryHandler } from '../controllers/inquiries.controller.js';

export async function inquiriesRoutes(app: FastifyInstance) {
  app.post('/inquiries', createInquiryHandler);
}
