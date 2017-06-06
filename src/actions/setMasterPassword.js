import { setSecret } from '.';
import { createAction } from 'redux-actions';
import { createSecret, decrypt } from '../crypt';
import loadDatabaseAndCredentials from './loadDatabaseAndCredentials';
import { isWeakPassword } from '../crypt/password';

const setMasterPasswordError = createAction('SET_MASTER_PASSWORD_ERROR', (error) => error);

export default (password) => (dispatch, getState) => {
    let { secret } = getState();
    if (secret) return;//secret already setted

    if (!password) {
        dispatch(setMasterPasswordError('Master password must be not empty'));
        return;
    }

    const { fileData, salt } = getState();
    secret = createSecret(password, salt);
    if (fileData) {
        let keystore;
        try {
            keystore = decrypt(fileData, secret);
            dispatch(setSecret(secret));
        } catch (e) {
            dispatch(setMasterPasswordError('Wrong master password'));
            return;
        }
        dispatch(loadDatabaseAndCredentials(keystore));
    } else {
        //check password securety
        if (isWeakPassword(password)) {
            dispatch(setMasterPasswordError('Master password too weak'));
            return;
        }

        dispatch(setSecret(secret));
        dispatch(loadDatabaseAndCredentials(null));
    }
};