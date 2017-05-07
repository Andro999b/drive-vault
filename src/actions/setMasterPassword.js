import { createAction } from 'redux-actions';
import { getPasswordRSAKey, decrypt } from '../crypt';
import { hashHistory as history } from 'react-router';
import setKeystore from './setKeystore';

export const setMasterPasswordError = createAction('SET_MASTER_PASSWORD_ERROR', (error) => error);
export const setMasterPasswordAndShowList = (password) => (dispatch, getState) => {
    if(!password)  {
        dispatch(setMasterPasswordError('Master password must be not empty'));
        return;
    }

    const {encryptedData, salt} = getState();
    const rsa = getPasswordRSAKey(password, salt);
    if(encryptedData) {
        try {
            const keystore = decrypt(encryptedData, rsa);
            dispatch(setKeystore(keystore, rsa));
        } catch (e) {
            dispatch(setMasterPasswordError('Wrong master password'));
            return;
        }
    } else {
        //TODO: check password securety

        dispatch(setKeystore({}, rsa));
        history.push('list');
    }
};