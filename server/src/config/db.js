import mongoose from 'mongoose';

export async function connectDb(uri) {
  mongoose.set('strictQuery', true);
  // Fail after 5 seconds if MongoDB cannot be reached, instead of waiting 30 seconds.
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  return mongoose.connection;
}

export async function disconnectDb() {
  await mongoose.disconnect();
}
