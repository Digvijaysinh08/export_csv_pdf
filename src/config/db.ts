import mongoose from 'mongoose';
import { config } from './index';
import { logger } from '../utils/logger';
export const connectDB = async (): Promise<void> => {
    try {
        const mongoURI = config.MONGO_URI;
        if (!mongoURI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }
        await mongoose.connect(mongoURI, {
            connectTimeoutMS: 10000,
            serverSelectionTimeoutMS: 10000,
        });
        mongoose.set('debug', config.MONGO_DEBUG === 'true');

        logger.info('⚡ Database connected. ⚡');
    } catch (error) {
        logger.error('🚨 Exhausted all retries. database connection failed. exiting process. 🚨', error);
        throw new Error('Failed to connect to the database');
    }
};
