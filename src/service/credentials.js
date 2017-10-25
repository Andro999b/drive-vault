export const TYPE_SINGLE_VALUE = 1;
export const TYPE_MULTI_VALUE = 2;
export const TYPE_LOGIN_PASSWORD = 3;
export const TYPE_CREDIT_CARD = 4;

export const allTypes = [
    TYPE_SINGLE_VALUE,
    TYPE_LOGIN_PASSWORD,
    TYPE_CREDIT_CARD,
    TYPE_MULTI_VALUE
];

const typeName = {
    [TYPE_SINGLE_VALUE]: 'Single value',
    [TYPE_MULTI_VALUE]: 'Multiple values',
    [TYPE_LOGIN_PASSWORD]: 'Login and Passwod',
    [TYPE_CREDIT_CARD]: 'Credit card'
};

function noEmptyValue(value) {
    return !value ? 'Can`t be emtpy' : null;
}

const typeScheme = {
    [TYPE_LOGIN_PASSWORD]: [{
        name: 'Login',
        validator: noEmptyValue
    },
    {
        name: 'Password',
        validator: noEmptyValue
    }],
    [TYPE_CREDIT_CARD]:  [{
        name: 'Card Number',
        validator: noEmptyValue
    },
    {
        name: 'Date',
        validator: noEmptyValue
    },
    {
        name: 'CSV',
        validator: noEmptyValue
    }],
};

function getSchemeValidator(type) {
    const scheme = typeScheme[type];

    return function(values) {
        if(values || values.length != scheme.length)
            return [{error: 'Wrong values'}];

        const getValue = (name) => values.find((item) => item.name == name);

        const errors = [];
        scheme.forEach(({name, validator}) => {
            const { value } = getValue(name);
            const error = validator(value);
            if(error) errors.push({name, error});
        });

        if(errors.length) return errors;
    };
}

const typeValidator = {
    [TYPE_SINGLE_VALUE]: (values) => {
        if(!values || !values.length)
            return [{error: 'Can`t be emtpy'}];

        if(values.length != 1)
            return [{error: 'Must be single value'}];

        if(!values[0].value)
            return [{error: 'Can`t be emtpy'}];
        
        return null;
    },
    [TYPE_MULTI_VALUE]: (values) => {
        if(!values || !values.length)
            return [{index: 0, error: 'Can`t be emtpy'}];

        const errors = [];
        values.forEach(({ name, value }, index) => {
            if(!value) {
                errors.push({index, error: 'Can`t be emtpy'});
            } else if (!name) {
                errors.push({index, nameError: 'Can`t be emtpy'});
            }
        });

        if(errors.length)
            return errors;
        else    
            return null;
    },
    [TYPE_LOGIN_PASSWORD]: (values) => getSchemeValidator(TYPE_LOGIN_PASSWORD)(values),
    [TYPE_CREDIT_CARD]: (values) => getSchemeValidator(TYPE_CREDIT_CARD)(values)
};

export const getTypeName = (type) => typeName[type];
export const getValidator= (type) => typeValidator[type];
export const getScheme = (type) => typeScheme[type];