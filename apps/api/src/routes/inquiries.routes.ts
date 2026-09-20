import type { FastifyInstance } from 'fastify';
import {
  createInquiryHandler,
  getInquiriesByProjectStatsHandler,
  getInquiriesTimelineHandler,
  listInquiriesHandler,
} from '../controllers/inquiries.controller.js';

export async function inquiriesRoutes(app: FastifyInstance) {
  app.post('/inquiries', createInquiryHandler);
  app.get('/inquiries', listInquiriesHandler);
  app.get('/inquiries/stats/by-project', getInquiriesByProjectStatsHandler);
  app.get('/inquiries/stats/timeline', getInquiriesTimelineHandler);
}
