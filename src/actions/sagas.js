import { createAction } from 'redux-actions';

export const INIT = 'init';
export const INIT_FINISH = 'init_finish';
export const DECRYPT_VAULT = 'decrypt_vault';
export const DECRYPT_VAULT_BY_PIN_CODE = 'decrypt_vault_by_pin_code';
export const UPDATE_MASTER_PASSWORD = 'update_master_password';
export const SET_NAME_FILTER= 'set_name_filter';
export const SELECT_GROUP = 'select_group';
export const SAVE_GROUP = 'save_group';
export const SAVE_CREDENTIAL = 'save_credential';
export const REMOVE_GROUP = 'remove_group';
export const REMOVE_CREDENTIAL = 'remove_credential';
export const DOWNLOAD_FILE = 'download_file';
export const CREATE_FILE = 'create_file';
export const REMOVE_FILE = 'remove_file';
export const CLOSE_FILE = 'close_file';
export const EXPORT_VAULT = 'export_vault';
export const EXPORT_JSON_VAULT = 'export_json_vault';
export const IMPORT_VAULT = 'import_vault';
export const UPLOAD_DATABASE = 'upload_database';
export const CLOSE_VAULT = 'close_vault';
export const SET_PINCODE = 'set_pincode';

export const decryptVault = createAction(DECRYPT_VAULT, (password) => password);
export const decryptVaultByPinCode = createAction(DECRYPT_VAULT_BY_PIN_CODE, (pinCode) => pinCode);
export const updateMasterPassword = createAction(UPDATE_MASTER_PASSWORD, (password) => password);
export const setNameFilter = createAction(SET_NAME_FILTER, (name) => name);
export const selectGroup = createAction(SELECT_GROUP, (group) => group);
export const saveGroup = createAction(SAVE_GROUP, (group) => group);
export const saveCredential = createAction(SAVE_CREDENTIAL, (credential) => credential);
export const removeGroup = createAction(REMOVE_GROUP, (group) => group);
export const removeCredential = createAction(REMOVE_CREDENTIAL, (credential) => credential); 
export const downloadFile = createAction(DOWNLOAD_FILE, (fileId) => fileId);
export const createNewFile = createAction(CREATE_FILE, (fileName) => fileName);
export const removeFile = createAction(REMOVE_FILE, (fileName) => fileName);
export const closeFile = createAction(CLOSE_FILE);
export const exportVault = createAction(EXPORT_VAULT, (password) => password);
export const exportJsonVault = createAction(EXPORT_JSON_VAULT);
export const importVault = createAction(IMPORT_VAULT, (password, file) => ({password, file}));
export const uploadDatabase = createAction(UPLOAD_DATABASE, (keystore) => ({keystore}));
export const closeValut = createAction(CLOSE_VAULT);
export const setPinCode = createAction(SET_PINCODE, (pincode) => pincode);
