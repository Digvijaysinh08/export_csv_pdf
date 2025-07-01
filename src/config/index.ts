import dotenv from 'dotenv';

dotenv.config();

type Config = {
    port: string;
    SERVER_NAME: string;
    MONGO_URI: string;
    NODE_ENV: string;
    MONGO_DEBUG: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
};

export const config: Config = {
    port: process.env.PORT!,
    SERVER_NAME: process.env.SERVER_NAME!,
    MONGO_URI: process.env.MONGO_URI!,
    NODE_ENV: process.env.NODE_ENV!,
    MONGO_DEBUG: process.env.MONGO_DEBUG!,
    JWT_SECRET: process.env.JWT_SECRET!,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN!,
};
