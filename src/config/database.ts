
import mongoose from 'mongoose';

export const connectDB = async (uri = process.env.MONGO_URI) => {
    if (!uri) {
        throw new Error('MongoDB URI is missing');
    }

    await mongoose.connect(uri);

    console.log(`MongoDB connected: ${mongoose.connection.name}`);
};
