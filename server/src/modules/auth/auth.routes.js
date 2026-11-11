import { Router } from 'express';
import { User } from '../users/user.model.js';
import { signToken, requireAuth } from '../../middleware/auth.js';

const router = Router();

// POST /api/v1/auth/register
router.post('/register', async (req, res, next) => {
  try {
    const { fullName, phone, email, password, role, preferredLanguage, location, crops } = req.body;

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({
        error: { code: 'VALIDATION_ERROR', message: 'Full name is required' },
      });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({
        error: { code: 'VALIDATION_ERROR', message: 'Phone number is required' },
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        error: { code: 'VALIDATION_ERROR', message: 'Password must be at least 6 characters' },
      });
    }

    const cleanPhone = phone.trim();
    const existingUser = await User.findOne({ phone: cleanPhone });
    if (existingUser) {
      return res.status(409).json({
        error: { code: 'USER_EXISTS', message: 'An account with this phone number already exists' },
      });
    }

    const user = new User({
      fullName: fullName.trim(),
      phone: cleanPhone,
      email: (email || '').trim().toLowerCase(),
      password,
      role: ['farmer', 'expert', 'admin'].includes(role) ? role : 'farmer',
      preferredLanguage: ['en', 'am', 'ti'].includes(preferredLanguage) ? preferredLanguage : 'en',
      location: (location || '').trim(),
      crops: Array.isArray(crops) ? crops : [],
    });

    await user.save();

    const token = signToken(user);
    res.status(201).json({
      message: 'Account registered successfully',
      token,
      user: user.toSafeObject(),
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { identifier, phone, password } = req.body;
    const loginIdentifier = (identifier || phone || '').trim();

    if (!loginIdentifier || !password) {
      return res.status(400).json({
        error: { code: 'VALIDATION_ERROR', message: 'Phone number and password are required' },
      });
    }

    // Allow logging in with phone or email
    const user = await User.findOne({
      $or: [
        { phone: loginIdentifier },
        { email: loginIdentifier.toLowerCase() },
      ],
    });

    if (!user) {
      return res.status(401).json({
        error: { code: 'INVALID_CREDENTIALS', message: 'Incorrect phone number or password' },
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        error: { code: 'INVALID_CREDENTIALS', message: 'Incorrect phone number or password' },
      });
    }

    const token = signToken(user);
    res.json({
      message: 'Logged in successfully',
      token,
      user: user.toSafeObject(),
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/auth/me
router.get('/me', requireAuth, async (req, res) => {
  res.json({
    user: req.user.toSafeObject(),
  });
});

export default router;
