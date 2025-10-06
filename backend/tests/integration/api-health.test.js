const request = require('supertest');

describe('API Integration Tests', () => {
  test('GET /api/health should return status ok', async () => {
    const response = await request('http://localhost:8888')
      .get('/api/health')
      .expect(200);

    expect(response.body).toEqual({ status: 'ok' });
  });

  test('GET /api/history should return request history array', async () => {
    const response = await request('http://localhost:8888')
      .get('/api/history')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });
});