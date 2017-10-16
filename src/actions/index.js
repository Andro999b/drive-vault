import { createAction } from 'redux-actions';

export const SET_CREDENTIALS = 'SET_CREDENTIALS';
export const SET_DB_INITED = 'SET_DB_INITED';
export const SET_SECRET ='SET_SECRET';
export const SET_FILE = 'SET_FILE';
export const SET_GROUPS = 'SET_GROUPS';
export const SET_PASSWORD_SALT = 'SET_PASSWORD_SALT';
export const SET_AUTH_RESULT = 'SET_AUTH_RESULT';
export const SET_SELECTED_GROUP = 'SET_SELECTED_GROUP';
export const SET_MASTER_PASSWORD_ERROR = 'SET_MASTER_PASSWORD_ERROR';

export const setCredentials =  createAction(SET_CREDENTIALS, (items) => items);
export const setDatabaseInited = createAction(SET_DB_INITED);
export const setSecret = createAction(SET_SECRET, (secret) => secret);
export const setFile = createAction(SET_FILE, (id, data) => ({id, data}));
export const setGroups = createAction(SET_GROUPS, (items) => items);
export const setPasswordSalt = createAction(SET_PASSWORD_SALT, (salt) => salt);
export const setAuthResult = createAction(SET_AUTH_RESULT, (result) => result);
export const setSelectedGroup = createAction(SET_SELECTED_GROUP, (group) => group);
export const setMasterPasswordError = createAction(SET_MASTER_PASSWORD_ERROR, (error) => error);