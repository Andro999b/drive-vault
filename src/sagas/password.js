import { setMasterPasswordError, setSecret, setDatabaseInited } from '../actions';
import { SET_MASTER_PASSWORD, UPDATE_MASTER_PASSWORD, selectGroup } from '../actions/sagas';

import { save as saveDatabase } from '../service/db';
import { createSecret, decrypt } from '../service/crypt';
import { isWeakPassword } from '../service/crypt/password';
import { SELECTED_GROUP_KEY, getSetting } from '../service/settings';

import { put, takeLatest, select, spawn, call } from 'redux-saga/effects';

import database from './database';
import history from '../history';

function* afterDatabaseInited(action) {
    yield put(setDatabaseInited());
    yield call(restoreLatestSelectGroup, action.payload);
    
    history.push('/list');
}

function* restoreLatestSelectGroup(db) {
    const id = getSetting(SELECTED_GROUP_KEY);
    if (!id) return;

    const group = db.getGroup(id);
    if (!group) return;

    yield put(selectGroup(group));
}

function* setMasterPassword(action) {
    const password = action.payload;
    let { secret, fileData, salt } = (yield select()).decrypt;

    if (secret) return;

    if (!password) {
        yield put(setMasterPasswordError('Master password must be not empty'));
        return;
    }

    secret = createSecret(password, salt);
    if (fileData) {
        let keystore;
        try {
            keystore = decrypt(fileData, secret);
            yield put(setSecret(secret));
        } catch (e) {
            yield put(setMasterPasswordError('Wrong master password'));
            return;
        }
        yield spawn(database, keystore, afterDatabaseInited);//TODO: cancel?
    } else {
        //check password security
        if (isWeakPassword(password)) {
            yield put(setMasterPasswordError('Master password too weak'));
            return;
        }

        yield put(setSecret(secret));
        yield spawn(database, null, afterDatabaseInited);
    }
}

function* updateMasterPassword(action) {
    const password = action.payload;
    const { salt } = (yield select()).decrypt;
    const secret = createSecret(password, salt);

    yield put(setSecret(secret));

    //force upload db
    saveDatabase();
}

export default function* () {
    yield takeLatest(SET_MASTER_PASSWORD, setMasterPassword);
    yield takeLatest(UPDATE_MASTER_PASSWORD, updateMasterPassword);
}