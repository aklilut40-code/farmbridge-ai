import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();
const DB_STATES = ['disconnected', 'connected', 'connecting', 'disconnecting'];

// GET /api/v1/health: lets you (and later a hosting platform) check the server is alive.
router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'farmbridge-server',
    uptimeSeconds: Math.round(process.uptime()),
    database: DB_STATES[mongoose.connection.readyState] ?? 'unknown',
  });
});

export default router;
