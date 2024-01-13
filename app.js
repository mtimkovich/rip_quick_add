import Fastify from 'fastify';
import FastifyBodyParser from '@fastify/formbody';
import { createEventUrl } from './rip_quick_add.js';

const app = Fastify({ logger: true });
app.register(FastifyBodyParser);

app.post('/rip_quick_add', async (request, reply) => {
  const text = request.body.text;
  const timezone = request.body.timezone;

  return {
    url: createEventUrl(text, timezone)
  };
});

(async () => {
  await app.listen({ port: 3000 })
  console.log('Running on http://localhost:3000/')
})();
