import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
      type: String,
      enum: ['farmer', 'expert', 'admin'],
      default: 'farmer',
    },
    preferredLanguage: {
      type: String,
      enum: ['en', 'am', 'ti'],
      default: 'en',
    },
    location: {
      type: String,
      trim: true,
      default: '',
    },
    crops: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toSafeObject = function () {
  return {
    id: this._id.toString(),
    fullName: this.fullName,
    phone: this.phone,
    email: this.email,
    role: this.role,
    preferredLanguage: this.preferredLanguage,
    location: this.location,
    crops: this.crops,
    createdAt: this.createdAt,
  };
};

export const User = mongoose.model('User', userSchema);
