import Joi from 'joi';
import { isValidObjectId } from '@utils';

export const patterns = {
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,15}$/,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    number: /^\d+$/,
    countryCode: /^\+\d{1,4}$/,
    phone: /^\d{4,15}$/,
};

export const joi = Joi.extend(joi => {
    return {
        type: 'objectId',
        base: joi.string(),
        rules: {
            isValid: {
                alias: 'valid',
                method() {
                    return this.$_addRule('isValid');
                },
                validate(value, helpers) {
                    if (!isValidObjectId(value)) {
                        return helpers.error('objectId.isValid');
                    }
                    return value;
                },
            },
        },
    };
});

export const commonValidations = {
    id: joi.objectId().valid().required(),
    email: joi.string().trim().lowercase().regex(patterns.email, 'emailPattern').required(),
    password: joi.string().trim().min(8).max(72).regex(patterns.password, 'passwordPattern').required(),
    country: joi.string().trim().required(),
    countryCode: joi.string().trim().regex(patterns.countryCode, 'countryCodePattern').required(),
    phone: joi.string().trim().regex(patterns.phone, 'phonePattern').required(),
    page: joi.number().integer().min(1).required(),
    perPage: joi.number().integer().min(1).required(),
};
