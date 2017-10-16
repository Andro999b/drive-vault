import { createAction } from 'redux-actions';

export const SET_REMOVE_GROUP = 'SET_REMOVE_GROUP';
export const SET_SAVE_GROUP = 'SET_SAVE_GROUP';
export const SET_REMOVE_CREDENTIAL = 'SET_REMOVE_CREDENTIAL';
export const SET_SAVE_CREDENTIAL = 'SET_SAVE_CREDENTIAL';
export const SET_CHANGE_PASSWORD_DIALOG = 'SET_CHANGE_PASSWORD_DIALOG';

export const showRemoveGroupDialog = createAction(SET_REMOVE_GROUP, (group) => group);
export const showSaveGroupDialog = createAction(SET_SAVE_GROUP, (group) => (group || {}));
export const showRemoveCredentialDialog = createAction(SET_REMOVE_CREDENTIAL, (credential) => credential);
export const showSaveCredentialDialog = createAction(SET_SAVE_CREDENTIAL, (credential) => (credential || {}));
export const hideRemoveGroupDialog = createAction(SET_REMOVE_GROUP, () => null);
export const hideSaveGroupDialog = createAction(SET_SAVE_GROUP, () => null);
export const hideRemoveCredentialDialog = createAction(SET_REMOVE_CREDENTIAL, () => null);
export const hideSaveCredentialDialog = createAction(SET_SAVE_CREDENTIAL, () => null);
export const showChangePasswordDialog = createAction(SET_CHANGE_PASSWORD_DIALOG, () => true);
export const hideChangePasswordDialog = createAction(SET_CHANGE_PASSWORD_DIALOG, () => false);