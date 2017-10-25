import {
    noEmptyValue,
    correctCardNumber,
    correctCardDate,
    correctCardCsv,
    combine,
    ERROR_CANT_BE_EMPTY
} from './validations';

export const TYPE_SINGLE_VALUE = 1;
export const TYPE_MULTI_VALUE = 2;
export const TYPE_LOGIN_PASSWORD = 3;
export const TYPE_CREDIT_CARD = 4;
export const TYPE_SITE_CREDENTIALS = 5;

export const allTypes = [
    TYPE_SINGLE_VALUE,
    TYPE_SITE_CREDENTIALS,
    TYPE_LOGIN_PASSWORD,
    TYPE_CREDIT_CARD,
    TYPE_MULTI_VALUE
];

const typeName = {
    [TYPE_SINGLE_VALUE]: 'Simple credential',
    [TYPE_MULTI_VALUE]: 'Multiple values',
    [TYPE_LOGIN_PASSWORD]: 'Login and Passwod',
    [TYPE_CREDIT_CARD]: 'Credit card',
    [TYPE_SITE_CREDENTIALS]: 'Site credentials'
};

const typeSchemas = {
    [TYPE_SITE_CREDENTIALS]: [{
        name: 'Site url',
        validator: noEmptyValue
    },{
        name: 'Login',
        validator: noEmptyValue
    },
    {
        name: 'Password',
        validator: noEmptyValue
    }],
    [TYPE_LOGIN_PASSWORD]: [{
        name: 'Login',
        validator: noEmptyValue
    },
    {
        name: 'Password',
        validator: noEmptyValue
    }],
    [TYPE_CREDIT_CARD]: [{
        name: 'Card Number',
        validator: combine(noEmptyValue, correctCardNumber)
    },
    {
        name: 'Date',
        validator: combine(noEmptyValue, correctCardDate)
    },
    {
        name: 'CSV',
        validator: combine(noEmptyValue, correctCardCsv)
    }],
};

function getSchemeValidator(type) {
    const scheme = typeSchemas[type];

    return function (values) {
        if (!values) {
            return scheme.map(({ name, }) => ({ name, error: ERROR_CANT_BE_EMPTY }));
        }

        const getValue = (name) => values.find((item) => item.name == name) || {};

        const errors = [];
        scheme.forEach(({ name, validator }) => {
            const { value } = getValue(name);
            const error = validator(value);
            if (error) errors.push({ name, error });
        });

        if (errors.length) return errors;
    };
}

const typeValidator = {
    [TYPE_SINGLE_VALUE]: (values) => {
        if (!values || !values.length || !values[0].value)
            return [{ error: ERROR_CANT_BE_EMPTY }];
    },
    [TYPE_MULTI_VALUE]: (values) => {
        if (!values || !values.length)
            return [{ index: 0, error: ERROR_CANT_BE_EMPTY }];

        const errors = [];
        values.forEach(({ name, value }, index) => {
            if (!value) {
                errors.push({ index, error: ERROR_CANT_BE_EMPTY });
            } else if (!name) {
                errors.push({ index, nameError: ERROR_CANT_BE_EMPTY });
            }
        });

        if (errors.length) return errors;
    },
    [TYPE_LOGIN_PASSWORD]: (values) => getSchemeValidator(TYPE_LOGIN_PASSWORD)(values),
    [TYPE_CREDIT_CARD]: (values) => getSchemeValidator(TYPE_CREDIT_CARD)(values),
    [TYPE_SITE_CREDENTIALS]: (values) => getSchemeValidator(TYPE_SITE_CREDENTIALS)(values)
};

export const getTypeName = (type) => typeName[type];
export const getValidator = (type) => typeValidator[type];
export const getSchema = (type) => typeSchemas[type];