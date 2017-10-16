import { SET_MASTER_PASSWORD, selectGroup } from './actions';
import { setMasterPasswordError, setSecret, setFile, setGroups, setCredentials, setDatabaseInited } from '../actions';
import { showToast } from '../actions/toast';

import { createSecret, decrypt, encrypt } from '../crypt';
import { isWeakPassword } from '../crypt/password';

import { put, takeLatest, select, take, call } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { SELECTED_GROUP_KEY, getSetting } from '../settings';
import { init } from '../db/index';
import { upload } from '../fs/index';
import history from '../history';

const DB_EVENT_SAVE = 'db_save';
const DB_EVENT_INIT = 'db_init';
const DB_EVENT_GROUPS_UPDATED = 'db_groups_updated';
const DB_EVENT_CREDENTIALS_UPDATED = 'db_creadential_updated';

function* saveDataBase(action) {
    try {
        const keystore = action.payload;
        const { fileId, secret } = yield select();

        const file = yield call(upload, { fileId, body: encrypt(keystore, secret) });
        yield put(setFile(file.id));
        yield put(showToast('Database synchronized'));
    } catch (e) {
        console.error(e);
        showToast('Database synchronize fail');
    }
}

function* updateGroups(action) {
    yield put(setGroups(action.payload));
}

function* updateCredentials(action) {
    yield put(setCredentials(action.payload));
}

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

function* initDatabase(keystore) {
    //conncect to db event;
    const dbChannel = eventChannel((emmiter) => {
        init(keystore, {
            onGoupsUpdated: (groups) => emmiter({ type: DB_EVENT_GROUPS_UPDATED, payload: groups }),
            onCredentialsUpdated: (credentials) => emmiter({ type: DB_EVENT_CREDENTIALS_UPDATED, payload: credentials }),
            onDatabaseSave: (keystore) => emmiter({ type: DB_EVENT_SAVE, payload: keystore })
        }).then((db) => emmiter({ type: DB_EVENT_INIT, payload: db }));
        return () => null;
    });

    try {
        while (true) {
            const action = yield take(dbChannel);
            switch (action.type) {
                case DB_EVENT_INIT: yield call(afterDatabaseInited, action); break;
                case DB_EVENT_SAVE: yield call(saveDataBase, action); break;
                case DB_EVENT_GROUPS_UPDATED: yield call(updateGroups, action); break;
                case DB_EVENT_CREDENTIALS_UPDATED: yield call(updateCredentials, action); break;
            }
        }
    } catch (e) {
        console.error(e);
    }
}

function* setMassterPassword(action) {
    const password = action.payload;
    let { secret, fileData, salt } = yield select();

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
        yield call(initDatabase, keystore);
    } else {
        //check password security
        if (isWeakPassword(password)) {
            yield put(setMasterPasswordError('Master password too weak'));
            return;
        }

        yield put(setSecret(secret));
        yield call(initDatabase, null);
    }
}

export default function* () {
    yield takeLatest(SET_MASTER_PASSWORD, setMassterPassword);
}