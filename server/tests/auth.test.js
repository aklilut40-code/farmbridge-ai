import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import { createApp } from '../src/app.js';
import { loadEnv } from '../src/config/env.js';
import { connectDb, disconnectDb } from '../src/config/db.js';
import { User } from '../src/modules/users/user.model.js';

const app = createApp({ clientOrigin: 'http://localhost:5173' });

describe('Auth routes validation', () => {
  it('rejects registration with missing required fields', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({});
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('rejects registration with short password', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      fullName: 'Abebe Bikila',
      phone: '+251911223344',
      password: '123',
    });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('rejects login with missing credentials', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({});
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });
});
