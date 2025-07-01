import { forOwn, isArray, isObject } from 'lodash';
import { json2csv, Json2CsvOptions } from 'json-2-csv';

export type AnyObject = { [key: string]: unknown };

export const toFlatObject = (
    obj: object,
    parentKey: string = '',
    result: AnyObject = {},
    seen: Set<unknown> = new Set()
): AnyObject => {
    if (seen.has(obj)) {
        return result;
    }

    seen.add(obj);

    const plainObject = JSON.parse(JSON.stringify(obj));

    forOwn(plainObject, (value, key) => {
        const newKey = parentKey ? `${parentKey}.${key}` : key;

        if (isObject(value) && !isArray(value)) {
            toFlatObject(value, newKey, result, seen);
        } else if (isArray(value)) {
            result[newKey] = value.length > 0 ? value.join(', ') : '';
        } else {
            result[newKey] = value || '';
        }
    });

    return result;
};

export const toFlatObjects = (data: object[]): object[] => {
    return data.map(data => toFlatObject(data));
};

export const jsonToCsvBuffer = (data: object[], options: Json2CsvOptions): string => {
    const flattenedData = toFlatObjects(data);

    return json2csv(flattenedData, options);
};
