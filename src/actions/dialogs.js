import { createAction } from 'redux-actions';
import { TYPE_SINGLE_VALUE } from 'service/credentials';

export const SET_REMOVE_GROUP = 'SET_REMOVE_GROUP';
export const SET_SAVE_GROUP = 'SET_SAVE_GROUP';
export const SET_REMOVE_CREDENTIAL = 'SET_REMOVE_CREDENTIAL';
export const SET_SAVE_CREDENTIAL = 'SET_SAVE_CREDENTIAL';
export const SET_REMOVE_FILE = 'SET_REMOVE_FILE';
export const SET_CHANGE_PASSWORD_DIALOG = 'SET_CHANGE_PASSWORD_DIALOG';
export const SET_IMPORT_DIALOG = 'SET_IMPORT_DIALOG';
export const SET_EXPORT_DIALOG  = 'SET_EXPORT_DIALOG';
export const SET_PIN_DIALOG  = 'SET_PIN_DIALOG';

export const showRemoveGroupDialog = createAction(SET_REMOVE_GROUP, (group) => group);
export const showSaveGroupDialog = createAction(SET_SAVE_GROUP, (group) => (group || {}));
export const showRemoveCredentialDialog = createAction(SET_REMOVE_CREDENTIAL, (credential) => credential);
export const showSaveCredentialDialog = createAction(SET_SAVE_CREDENTIAL, (credential) => (credential || {type: TYPE_SINGLE_VALUE}));
export const showCopyCredentialDialog = createAction(SET_SAVE_CREDENTIAL, (credential) => ({
    id: null,
    name: credential.name + ' - copy',
    type: credential.type,
    values: credential.values
}));
export const showCreateSimilarCredentialDialog = createAction(SET_SAVE_CREDENTIAL, (credential) => ({
    id: null,
    name: credential.name + ' - copy',
    type: credential.type,
    values: credential.values.map((item) => ({
        name: item.name,
        value: null
    }))
}));
export const hidePinDialog = createAction(SET_PIN_DIALOG, () => false);
export const showPinDialog = createAction(SET_PIN_DIALOG, () => true);
export const hideRemoveGroupDialog = createAction(SET_REMOVE_GROUP, () => null);
export const hideSaveGroupDialog = createAction(SET_SAVE_GROUP, () => null);
export const hideRemoveCredentialDialog = createAction(SET_REMOVE_CREDENTIAL, () => null);
export const hideSaveCredentialDialog = createAction(SET_SAVE_CREDENTIAL, () => null);
export const showChangePasswordDialog = createAction(SET_CHANGE_PASSWORD_DIALOG, () => true);
export const hideChangePasswordDialog = createAction(SET_CHANGE_PASSWORD_DIALOG, () => false);
export const showRemoveFileDialog = createAction(SET_REMOVE_FILE, (file) => file);
export const hideRemoveFileDialog = createAction(SET_REMOVE_FILE, () => null);
export const showExportDialog = createAction(SET_EXPORT_DIALOG, () => true);
export const hideExportDialog = createAction(SET_EXPORT_DIALOG, () => false);
export const showImportDialog = createAction(SET_IMPORT_DIALOG, () => ({}));
export const showImportDialogError = createAction(SET_IMPORT_DIALOG, (error) => ({error: error}));
export const hideImportDialog = createAction(SET_IMPORT_DIALOG, () => null);