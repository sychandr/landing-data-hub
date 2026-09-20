import Fastify from 'fastify';
import { env } from './config/env.js';
import { corsPlugin } from './plugins/cors.js';
import { inquiriesRoutes } from './routes/inquiries.routes.js';

const server = Fastify({ logger: true });

server.register(corsPlugin);

server.get('/health', async () => ({ status: 'ok' }));
server.register(inquiriesRoutes);

const start = async () => {
  try {
    await server.listen({ port: env.PORT, host: '0.0.0.0' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
