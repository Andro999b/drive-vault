import { createAction } from 'redux-actions';

export const setCredentials =  createAction('SET_CREDENTIALS', (items) => items);
export const setDatabdaseInited = createAction('SET_DB_INITED');
export const setFile = createAction('SET_FILE', (id, data) => ({id, data}));
export const setGroups = createAction('SET_GROUPS', (items) => items);
export const setPasswordSalt = createAction('SET_PASSWORD_SALT', (salt) => salt);
export const setAuthResult = createAction('SET_AUTH_RESULT', (result) => result);
export const setSelectedGroup = createAction('SET_SELECTED_GROUP', (group) => group);