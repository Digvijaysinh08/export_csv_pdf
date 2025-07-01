import { CommonId, UserId } from '../schemas';

export interface GetUsers extends CommonId {
    search: string;
    sort?: string;
}

export interface GetUserByEmailAndPhone {
    email?: string;
    countryCode?: string;
    phone?: string;
}
