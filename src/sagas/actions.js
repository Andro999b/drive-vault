import { createAction } from 'redux-actions';

export const INIT = 'init';
export const INIT_FINISH = 'init_finish';
export const SET_MASTER_PASSWORD = 'set_master_password';
export const UPDATE_MASTER_PASSWORD = 'update_master_password';
export const SET_NAME_FILTER= 'set_name_filter';
export const SELECT_GROUP = 'select_group';
export const SAVE_GROUP = 'save_group';
export const SAVE_CREDENTIAL = 'save_credential';
export const REMOVE_GROUP = 'remove_group';
export const REMOVE_CREDENTIAL = 'remove_credential';

export const setMasterPassword = createAction(SET_MASTER_PASSWORD, (password) => password);
export const updateMasterPassword = createAction(UPDATE_MASTER_PASSWORD, (password) => password);
export const setNameFilter = createAction(SET_NAME_FILTER, (name) => name);
export const selectGroup = createAction(SELECT_GROUP, (group) => group);
export const saveGroup = createAction(SAVE_GROUP, (group) => group);
export const saveCredential = createAction(SAVE_CREDENTIAL, (credential) => credential);
export const removeGroup = createAction(REMOVE_GROUP, (group) => group);
export const removeCredential = createAction(REMOVE_CREDENTIAL, (credential) => credential); 