import { createAction } from 'redux-actions';

export const showRemoveGroupDialog = createAction('SET_REMOVE_GROUP', (group) => group);
export const showCreateEditGroupDialog = createAction('SET_CREATE_EDIT_GROUP', (group) => (group || {}));
export const showRemoveCredentialDialog = createAction('SET_REMOVE_CREDENTIAL', (credential) => credential);
export const showCreateEditCredentialDialog = createAction('SET_CREATE_EDIT_CREDENTIAL', (credential) => (credential || {}));
export const hideRemoveGroupDialog = createAction('SET_REMOVE_GROUP', () => null);
export const hideCreateEditGroupDialog = createAction('SET_CREATE_EDIT_GROUP', () => null);
export const hideRemoveCredentialDialog = createAction('SET_REMOVE_CREDENTIAL', () => null);
export const hideCreateEditCredentialDialog = createAction('SET_CREATE_EDIT_CREDENTIAL', () => null);