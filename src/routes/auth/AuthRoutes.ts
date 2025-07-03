import { RequestHandler, Router } from 'express';
import AuthService from './AuthService';

const router = Router();

router.post('/log-in', AuthService.login as unknown as RequestHandler);


export { router };
