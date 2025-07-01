import fs from 'fs';
import { Router } from 'express';
import { logger } from '../utils/logger';

const routers = Router();
const routes: string[] = fs.readdirSync(__dirname);

routes.forEach(async (route: string) => {
    if (fs.lstatSync(`${__dirname}/${route}`).isDirectory()) {
        const { router } = await import(`./${route}`);
        routers.use(`/${route}`, router);
    }
});

export default routers;
