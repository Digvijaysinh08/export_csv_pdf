import jwt from 'jsonwebtoken';
import { SignUserToken } from '@types';
import { config } from '../config';
import { IUserDoc } from '../schemas';
import UserDao from '../dao/UserDao';
import { Types } from 'mongoose';

export const SignToken = (user: SignUserToken): string => {
    const payload = {
        id: user.id,
        email: user.email,
        phone: user.phone,
    };

    return jwt.sign(payload, config.JWT_SECRET);
};

export const VerifyToken = async (
    token: string
): Promise<{
    success: boolean;
    user?: IUserDoc;
    error?: string;
}> => {
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET) as SignUserToken;
        const user = await UserDao.getUserById({ user: new Types.ObjectId(decoded.id) });

        return {
            success: true,
            user: user ?? undefined,
        };
    } catch (error) {
        return { success: false, error: 'Invalid token' };
    }
};
