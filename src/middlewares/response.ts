import { Response, Request, NextFunction } from 'express';
import { logger } from '@utils';

export const customResponse = (req: Request, res: Response, next: NextFunction) => {
    res.success = (data = null, message = '') => {
        return res.status(200).json({ success: true, data, message });
    };

    res.warn = (data = null, message = '') => {
        return res.status(200).json({ success: false, data, message });
    };

    res.badRequest = (data = null, message = '') => {
        return res.status(400).json({ success: false, data, message });
    };

    res.unauthorized = (data = null, message = '') => {
        return res.status(401).json({ success: false, data, message });
    };

    res.notFound = (data = null, message = '') => {
        return res.status(404).json({ success: false, data, message });
    };

    res.serverError = (data = null, message = '', err: Error | undefined = undefined) => {
        if (err) logger.error('Server error', err);

        const safeError = err && err.message ? { message: err.message } : null;

        return res.status(500).json({
            success: false,
            message,
            error: safeError,
        });
    };

    next();
};
