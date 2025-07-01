import { RequestHandler, Router } from 'express';
import AuthService from './AuthService';
import UserService from '../user/UserService';

const router = Router();

router.post('/log-in', AuthService.login as unknown as RequestHandler);

router.get('/', UserService.getAll as unknown as RequestHandler);

export { router };
