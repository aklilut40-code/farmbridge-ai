import { Router } from 'express';
import healthRoutes from '../modules/health/health.routes.js';
import authRoutes from '../modules/auth/auth.routes.js';

// All API routes are mounted here. Later modules (auth, farms, cases...) are added the same way.
const router = Router();
router.use('/health', healthRoutes);
router.use('/auth', authRoutes);

export default router;
