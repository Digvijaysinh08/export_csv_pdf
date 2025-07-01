import { Request, Response } from 'express';
import UserDao from '../../dao/UserDao';
import { UserLogIn } from '@types';
import { getUserObj, SignToken } from '@root/src/utils';

class AuthService {
    async login(req: Request, res: Response) {
        const { email, countryCode, phone, password }: UserLogIn = req.body;

        const userData = await UserDao.getUserByEmailOrPhone({
            email,
            countryCode,
            phone,
        });

        if (!userData) {
            return res.warn(null, 'USER_NOT_FOUND');
        }

        const passwordMatched = await userData.comparePassword(password);
        if (!passwordMatched) {
            return res.unauthorized(null, 'INVALID_PASSWORD');
        }

        const token = SignToken({
            id: userData._id.toString(),
            email: userData.email,
            phone: userData.phone,
        });

        const userJson = getUserObj(userData);

        return res.success({
            token,
            user: userJson,
        });
    }
}

export default new AuthService();
