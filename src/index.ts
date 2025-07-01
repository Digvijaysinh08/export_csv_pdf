import app from './app';
import { config } from './config';
import { connectDB } from './config/db';
import { logger } from '@utils';

const PORT = config.port;

const startServer = async (): Promise<void> => {
    try {
        app.listen(PORT, () => {
            logger.info(`🚀 Server ${config.SERVER_NAME} is running at http://localhost:${PORT} 🚀`);
        });
        await connectDB();
    } catch (error) {
        logger.error('Error starting the server:', error);
        process.exit(1);
    }
};
startServer();
