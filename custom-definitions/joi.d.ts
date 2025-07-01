import { Extension, AnySchema } from 'joi';

export const objectId: Extension;

export interface ObjectIdSchema extends AnySchema {
    isValid(): this;
    valid(): this;
}

declare module 'joi' {
    interface Root {
        objectId(): ObjectIdSchema;
    }
}
