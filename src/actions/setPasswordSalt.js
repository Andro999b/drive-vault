import { createAction } from 'redux-actions';

export default createAction('SET_PASSWORD_SALT', (salt) => salt);