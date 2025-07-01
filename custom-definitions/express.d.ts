import { IUserDoc } from '@schemas';

export interface ResponseTypes {
    success: (data?: any, message?: string | string[]) => void;
    warn: (data?: any, message?: string | string[]) => void;
    badRequest: (data?: any, message?: string | string[]) => void;
    unauthorized: (data?: any, message?: string | string[]) => void;
    forbidden: (data?: any, message?: string | string[]) => void;
    notFound: (data?: any, message?: string | string[]) => void;
    tooManyRequests: (data?: any, message?: string | string[]) => void;
    serverError: (data?: any, message?: string | string[], err?: Error) => void;
}

declare global {
    namespace Express {
        interface Request {
            user: IUserDoc;
        }

        interface Response extends ResponseTypes {}
    }
}
