import { Request, Response, NextFunction } from 'express';
import { VerifyToken } from '../utils/auth';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.unauthorized(null, 'Unauthorized access.');
    }

    const result = await VerifyToken(token);

    if (!result.success || !result.user) {
        return res.unauthorized(null, result.error || 'Unauthorized');
    }

    req.user = result.user;
    next();
};
