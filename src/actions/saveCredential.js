import {get as db} from '../db';
import {hideSaveCredentialDialog} from './dialogs';

export default (credential) => (dispatch) => {
    db().saveCredential(credential);
    dispatch(hideSaveCredentialDialog());
};