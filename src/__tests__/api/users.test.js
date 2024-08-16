import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import request from 'supertest';

const app = next({ dev: true });
const handle = app.getRequestHandler();

let server;

beforeAll(async () => {
  await app.prepare();
  server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000);
});

afterAll(() => {
  if (server) {
    server.close();
  }
});

test('GET /api/users returns a list of users', async () => {
  const response = await request(server).get('/api/users');
  expect(response.status).toBe(200);
  expect(response.body).toEqual([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
  ]);
});
