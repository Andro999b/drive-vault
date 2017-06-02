import {get as db} from '../db';
import {hideRemoveCredentialDialog} from './dialogs';

export default (credential) => (dispatch) => {
    db().removeCredential(credential);
    dispatch(hideRemoveCredentialDialog());
};