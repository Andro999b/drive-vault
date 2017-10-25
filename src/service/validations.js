import * as cardValid from 'card-validator';

export const ERROR_CANT_BE_EMPTY = 'Can`t be empty';
export const ERROR_CARD_NUMBER = 'Invalid card number';
export const ERROR_CARD_DATE = 'Invalid card date';
export const ERROR_CARD_DATE_MONTH = 'Invalid card month';
export const ERROR_CARD_DATE_YEAR = 'Invalid card year';
export const ERROR_CARD_CSV = 'Invalid csv';
export const ERROR_URL = 'Invalid url';

export function combine(...validators) {
    return function (value) {
        for (let i in validators) {
            const result = validators[i](value);
            if (result) return result;
        }
    };
}

export function noEmptyValue(value) {
    if(!value) return ERROR_CANT_BE_EMPTY;
}

export function correctCardNumber(value) {
    if (!cardValid.number(value).isValid)
        return ERROR_CARD_NUMBER;
}

export function correctCardDate(value) {
    const { month, year, isValid } = cardValid.expirationDate(value);

    if (!isValid) return ERROR_CARD_DATE;
    if (!cardValid.expirationMonth(month).isValid) return ERROR_CARD_DATE_MONTH;
    if (!cardValid.expirationYear(year).isValid) return ERROR_CARD_DATE_YEAR;
}

export function correctCardCsv(value) {
    if (!cardValid.cvv(value).isValid)
        return ERROR_CARD_CSV;
}