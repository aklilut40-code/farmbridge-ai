import 'dotenv/config';

// Reads and validates environment variables once, at startup.
// If something required is missing the server stops immediately with a clear message,
// instead of failing later in a confusing way.
export function loadEnv(source = process.env) {
  const errors = [];

  const nodeEnv = source.NODE_ENV || 'development';
  if (!['development', 'test', 'production'].includes(nodeEnv)) {
    errors.push('NODE_ENV must be development, test or production');
  }

  const port = Number(source.PORT || 5000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    errors.push('PORT must be a whole number between 1 and 65535');
  }

  const mongodbUri = source.MONGODB_URI;
  if (!mongodbUri) {
    errors.push('MONGODB_URI is required (copy .env.example to .env and set it)');
  } else if (!/^mongodb(\+srv)?:\/\//.test(mongodbUri)) {
    errors.push('MONGODB_URI must start with mongodb:// or mongodb+srv://');
  }

  const clientOrigin = source.CLIENT_ORIGIN || 'http://localhost:5173';
  const jwtSecret = source.JWT_SECRET || 'farmbridge-dev-secret-key-change-in-prod';

  if (errors.length > 0) {
    throw new Error(`Invalid environment settings:\n - ${errors.join('\n - ')}`);
  }

  return { nodeEnv, port, mongodbUri, clientOrigin, jwtSecret, isProduction: nodeEnv === 'production' };
}
