import Fastify from 'fastify';
import FastifyBodyParser from '@fastify/formbody';
import { createEventUrl } from './rip_quick_add.js';

const app = Fastify({ logger: true });
app.register(FastifyBodyParser);

app.post('/rip_quick_add_api', async (request, reply) => {
  const text = request.body.text;

  return {
    url: createEventUrl(text)
  };
});

app.get('/rip_quick_add_api', async (request, reply) => {
  const text = request.query.text;
  const url = createEventUrl(text);

  if (url === null) {
    reply.redirect('https://calendar.google.com/calendar/u/0/r/eventedit');
  }

  reply.redirect(url);
});

(async () => {
  await app.listen({ port: 3000 })
  console.log('Running on http://localhost:3000/')
})();
