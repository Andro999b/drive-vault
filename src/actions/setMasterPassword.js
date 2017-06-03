import { setSecret } from '.';
import { createAction } from 'redux-actions';
import { createSecret, decrypt} from '../crypt';
import { hashHistory as history } from 'react-router';
import initDatabase from './initDatabase';
import { isWeakPassword } from '../crypt/password';

const setMasterPasswordError = createAction('SET_MASTER_PASSWORD_ERROR', (error) => error);

export default (password) => (dispatch, getState) => {
    if(!password)  {
        dispatch(setMasterPasswordError('Master password must be not empty'));
        return;
    }

    const {fileData, salt} = getState();
    const secret = createSecret(password, salt);
    if(fileData) {
        try {
            const keystore = decrypt(fileData, secret);

            dispatch(setSecret(secret));
            dispatch(initDatabase(keystore));
        } catch (e) {
            dispatch(setMasterPasswordError('Wrong master password'));
            return;
        }
    } else {
        //TODO: check password securety
        if(isWeakPassword(password)) {
            dispatch(setMasterPasswordError('Master password too weak'));
            return;
        }

        dispatch(setSecret(secret));
        dispatch(initDatabase(null));
    }
    history.push('list');
};