import { Types } from 'mongoose';
import path from 'path';
import fs from 'fs';
import { IUserDoc, TypesObjectId } from '@schemas';
import { ejsTemplateToPdfBuffer } from './export-pdf';

const { ObjectId } = Types;

const isValidObjectId = (objectId: string): boolean => {
    if (ObjectId.isValid(objectId)) {
        const id: TypesObjectId = new ObjectId(objectId);
        return id.toString() === objectId;
    }
    return false;
};

const getUserObj = (userDoc: IUserDoc) => {
    const keysToBeRemoved = ['password', '__v'];

    const user = userDoc.toJSON();
    keysToBeRemoved.forEach(key => delete user[key]);
    return user;
};

const getSearchRegex = (text: string | undefined): RegExp | null =>
    text
        ? new RegExp(
              text
                  .split(' ')
                  .filter(val => val)
                  .map(value => value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'))
                  .join(' '),
              'i'
          )
        : null;

const toObjectId = (id: string): TypesObjectId => new ObjectId(id);

export const exportPdf = async (template: string, data: object[]) => {
    const templatePath = path.join(__dirname, '..', 'views', template);
    const templateContent = fs.readFileSync(templatePath, 'utf-8');

    const pdfBuffer = await ejsTemplateToPdfBuffer(templateContent, data);

    return pdfBuffer;
};

export { isValidObjectId, toObjectId, getSearchRegex, getUserObj };
