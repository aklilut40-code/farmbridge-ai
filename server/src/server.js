import { loadEnv } from './config/env.js';
import { connectDb, disconnectDb } from './config/db.js';
import { createApp } from './app.js';

async function main() {
  const env = loadEnv();
  await connectDb(env.mongodbUri);
  console.log('MongoDB connected');

  const app = createApp({ clientOrigin: env.clientOrigin });
  const server = app.listen(env.port, () => {
    console.log(`FarmBridge server listening on http://localhost:${env.port}`);
  });

  // Close cleanly when you press Ctrl+C or the host stops the process.
  const shutdown = async (signal) => {
    console.log(`${signal} received, shutting down`);
    server.close(async () => {
      await disconnectDb();
      process.exit(0);
    });
  };
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

main().catch((err) => {
  console.error('\nServer startup error:', err.message);
  if (err.message.includes('ECONNREFUSED')) {
    console.error('Note: MongoDB is not reachable on 127.0.0.1:27017.');
    console.error('You can run local MongoDB with: mongod --dbpath ~/.farmbridge-data');
    console.error('Or configure MONGODB_URI in server/.env to use a free MongoDB Atlas cluster.\n');
  }
  process.exit(1);
});
