import app from '../index';
import supertest from 'supertest';

const request = supertest(app);

describe('Server Endpoint test', () => {
  it('Home Endpoint testing', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
