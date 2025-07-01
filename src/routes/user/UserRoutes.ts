import { RequestHandler, Router } from 'express';
import { validate } from '@utils';
import { verifyToken } from '@middlewares';
import UserService from './UserService';
import UserValidation from './UserValidation';

const router = Router();

router.post('/', validate(UserValidation.create, 'body'), UserService.create as unknown as RequestHandler);

router.get('/', verifyToken, UserService.getAll as unknown as RequestHandler);

router.get('/export-sample-excel', verifyToken, UserService.exportSampleExcel as unknown as RequestHandler);

router.get('/export-csv', verifyToken, UserService.exportCsv as unknown as RequestHandler);

router.get('/export-pdf', verifyToken, UserService.exportPdf as RequestHandler);

export { router };
