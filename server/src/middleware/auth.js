import jwt from 'jsonwebtoken';
import { loadEnv } from '../config/env.js';
import { User } from '../modules/users/user.model.js';

export function signToken(user) {
  const env = loadEnv();
  return jwt.sign(
    {
      id: user._id ? user._id.toString() : user.id,
      role: user.role,
      phone: user.phone,
    },
    env.jwtSecret,
    { expiresIn: '7d' }
  );
}

export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: { code: 'UNAUTHORIZED', message: 'Authentication required' },
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const env = loadEnv();
    const payload = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(401).json({
        error: { code: 'USER_NOT_FOUND', message: 'User does not exist' },
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      error: { code: 'INVALID_TOKEN', message: 'Session expired or invalid token' },
    });
  }
}
