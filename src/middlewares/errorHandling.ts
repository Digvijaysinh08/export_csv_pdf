import { Express, NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';

interface ExpressError extends Error {
    status?: number;
    code?: number | string;
    errors?: any;
    isJoi?: boolean;
    details?: any;
}

export const errorHandling = (app: Express) => {
    app.use(((err: ExpressError, req: Request, res: Response, next: NextFunction) => {
        if (res.headersSent) {
            return next(err);
        }

        if (err.isJoi && err.details) {
            logger.error(`Validation Error in ${req.method} ${req.originalUrl}`, {
                message: err.message,
                details: err.details,
            });
            return res.badRequest(err.details, 'Validation failed');
        }

        logger.error(`Error in request: ${req.method} ${req.originalUrl}`, err);

        if (err.message === 'EntityNotFound') {
            return res.notFound(res, 'Resource not found');
        }

        return res.serverError(res, 'Something went wrong', err);
    }) as (err: any, req: Request, res: Response, next: NextFunction) => void);

    app.use(((req: Request, res: Response, _next: NextFunction) => {
        logger.error(`404 - Not Found: ${req.method} ${req.originalUrl}`);
        return res.notFound(res, 'Requested resource not found');
    }) as (req: Request, res: Response, next: NextFunction) => void);
};
