import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { loadEnv } from '../src/config/env.js';

const app = createApp({ clientOrigin: 'http://localhost:5173' });

describe('GET /api/v1/health', () => {
  it('returns status ok', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.service).toBe('farmbridge-server');
    expect(typeof res.body.uptimeSeconds).toBe('number');
  });
});

describe('unknown routes', () => {
  it('return the standard JSON error shape', async () => {
    const res = await request(app).get('/api/v1/does-not-exist');
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });
});

describe('loadEnv', () => {
  it('throws a clear message when MONGODB_URI is missing', () => {
    expect(() => loadEnv({})).toThrow(/MONGODB_URI is required/);
  });

  it('accepts valid settings and applies defaults', () => {
    const env = loadEnv({ MONGODB_URI: 'mongodb://127.0.0.1:27017/farmbridge' });
    expect(env.port).toBe(5000);
    expect(env.clientOrigin).toBe('http://localhost:5173');
    expect(env.nodeEnv).toBe('development');
  });
});
