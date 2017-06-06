import { setDatabaseInited, setGroups, setCredentials } from '.';
import { saveStorage } from './storage';
import { encrypt } from '../crypt';
import { init } from '../db/index';
import { hashHistory as history } from 'react-router';
import restoreLatestSelectGroup from './restoreLatestSelectGroup';

export default (keystore) => (dispatch, getState) => 
    init(keystore, {
        onGoupsUpdated: (groups) => dispatch(setGroups(groups)),
        onCredentialsUpdated: (credentials) => dispatch(setCredentials(credentials)),
        onDatabaseSave: (keystore) => {
            const {fileId, secret} = getState();
            dispatch(saveStorage(fileId, encrypt(keystore, secret)));
        }
    })
    .then(() => dispatch(restoreLatestSelectGroup()))
    .then(() => dispatch(setDatabaseInited()))
    .then(() => history.push('list'));
