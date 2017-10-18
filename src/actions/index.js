import { createAction } from 'redux-actions';

export const SET_CREDENTIALS = 'SET_CREDENTIALS';
export const SET_DB_INITED = 'SET_DB_INITED';
export const SET_SECRET ='SET_SECRET';
export const SET_FILE = 'SET_FILE';
export const SET_NEW_FILE_NAME = 'SET_FILE_NAME';
export const SET_NEW_FILE_NAME_ERROR = 'SET_FILE_NAME_ERROR';
export const SET_FILE_LOADING = 'SET_FILE_LOADING';
export const SET_FILES_LIST = 'SET_FILES_LIST';
export const SET_GROUPS = 'SET_GROUPS';
export const SET_PASSWORD_SALT = 'SET_PASSWORD_SALT';
export const SET_INIT_ERROR = 'SET_INIT_ERROR';
export const SET_SELECTED_GROUP = 'SET_SELECTED_GROUP';
export const SET_MASTER_PASSWORD_ERROR = 'SET_MASTER_PASSWORD_ERROR';

export const setCredentials =  createAction(SET_CREDENTIALS, (items) => items);
export const setDatabaseInited = createAction(SET_DB_INITED);
export const setSecret = createAction(SET_SECRET, (secret) => secret);
export const setFile = createAction(SET_FILE, (id, data) => ({id, data}));
export const setFileLoading = createAction(SET_FILE_LOADING, (loading) => loading);
export const setNewFileName = createAction(SET_NEW_FILE_NAME, (name) => name);
export const setNewFileNameError = createAction(SET_NEW_FILE_NAME_ERROR, (error) => error);
export const setFilesList = createAction(SET_FILES_LIST, (result) => result);
export const setGroups = createAction(SET_GROUPS, (items) => items);
export const setPasswordSalt = createAction(SET_PASSWORD_SALT, (salt) => salt);
export const setInitError = createAction(SET_INIT_ERROR, (result) => result);
export const setSelectedGroup = createAction(SET_SELECTED_GROUP, (group) => group);
export const setMasterPasswordError = createAction(SET_MASTER_PASSWORD_ERROR, (error) => error);