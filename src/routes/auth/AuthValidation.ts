import { commonValidations, joi } from '@utils';

const requiredId = joi.object().keys({
    id: commonValidations.id,
});

const create = joi.object().keys({
    firstName: joi.string().trim().min(3).max(30).required(),
    lastName: joi.string().trim().min(3).max(30).required(),
    email: commonValidations.email,
    countryCode: commonValidations.countryCode,
    phone: commonValidations.phone,
    password: commonValidations.password,
});

export default {
    requiredId,
    create,
};
