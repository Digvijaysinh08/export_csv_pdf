import { Schema, Types } from 'mongoose';

export type TypesObjectId = Types.ObjectId;
export const ObjectId = Schema.Types.ObjectId;

export interface CommonId {
    id: TypesObjectId;
}
export interface UserId {
    user: TypesObjectId;
}

export interface Pagination {
    page: number;
    perPage: number;
}

export * from './User';
