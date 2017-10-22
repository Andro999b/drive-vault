export const TYPE_SINGLE_VALUE = 1;
export const TYPE_MULTI_VALUE = 2;
export const TYPE_LOGIN_PASSWORD = 3;
export const TYPE_CREDIT_CARD = 4;

const typeName = {
    [TYPE_SINGLE_VALUE]: 'Single value',
    [TYPE_MULTI_VALUE]: 'Multiple values',
    [TYPE_LOGIN_PASSWORD]: 'Login and Passwod',
    [TYPE_CREDIT_CARD]: 'Credit card'
};

const typeScheme = {
    [TYPE_LOGIN_PASSWORD]: [{
        name: 'Login'
    },
    {
        name: 'Password'
    }],
    [TYPE_CREDIT_CARD]:  [{
        name: 'Card Number'
    },
    {
        name: 'Date'
    },
    {
        name: 'CSV'
    }],
};

const typeValidator = {
    [TYPE_SINGLE_VALUE]: (values) => true,
    [TYPE_MULTI_VALUE]: (values) => true,
    [TYPE_LOGIN_PASSWORD]: (values) => true,
    [TYPE_CREDIT_CARD]: (values) => true
};

export const getTypeName = (type) => typeName[type];
export const getValidator= (type) => typeValidator[type];
export const getScheme = (type) => typeScheme[type];