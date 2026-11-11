import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import apiRoutes from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

// Builds the Express app but does NOT start a server or connect to the database.
// That keeps it easy to test: tests can call createApp() without opening a port.
export function createApp({ clientOrigin }) {
  const app = express();
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors({ origin: clientOrigin }));
  app.use(express.json({ limit: '1mb' }));

  app.use('/api/v1', apiRoutes);

  app.use(notFound);
  app.use(errorHandler);
  return app;
}
