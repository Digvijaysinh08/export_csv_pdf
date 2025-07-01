import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import { config } from '@config';
import { logger } from '@utils';
import { customResponse, errorHandling } from '@middlewares';
import routers from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms', {
        stream: {
            write: message => logger.info(message.trim()),
        },
    })
);
app.use(customResponse);

if (config.NODE_ENV === 'development') {
    const swaggerDocument = YAML.load('./src/docs/swagger.yaml');
    app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument, {
            customSiteTitle: process.env.SITE_TITLE,
            swaggerOptions: {
                filter: true,
                displayRequestDuration: true,
            },
        })
    );
}

app.use('/api', routers);

errorHandling(app);
export default app;
