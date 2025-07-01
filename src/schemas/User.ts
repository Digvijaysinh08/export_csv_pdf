import { Document, Model } from 'mongoose';
import { TypesObjectId } from '@schemas';

export interface IUser {
    firstName: string;
    lastName?: string;
    fullName: string;
    email: string;
    password: string;
    countryCode: Number;
    phone: string;
    createdAt: Date;
}

export interface IUserDoc extends IUser, Document {
    _id: TypesObjectId;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(password: string): Promise<boolean>;
}

export type IUserModel = Model<IUserDoc>;
