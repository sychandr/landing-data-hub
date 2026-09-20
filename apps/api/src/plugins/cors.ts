import cors from '@fastify/cors';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { env } from '../config/env.js';

export const corsPlugin = fp(async function corsPlugin(app: FastifyInstance) {
  await app.register(cors, {
    origin: env.ALLOWED_ORIGINS,
  });
});
