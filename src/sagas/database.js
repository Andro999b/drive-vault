import { setFile, setGroups, setCredentials } from '../actions';
import { showToast } from '../actions/toast';

import { encrypt } from '../service/crypt';

import { init } from '../service/db';
import { upload } from '../service/fs';

import { put, select, take, call } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

const DB_EVENT_SAVE = 'db_save';
const DB_EVENT_INIT = 'db_init';
const DB_EVENT_GROUPS_UPDATED = 'db_groups_updated';
const DB_EVENT_CREDENTIALS_UPDATED = 'db_creadential_updated';

function* saveDataBase(action) {
    try {
        const keystore = action.payload;
        const { fileId, fileName, secret } = (yield select()).decrypt;

        const file = yield call(upload, { fileId, fileName, body: encrypt(keystore, secret) });
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

export default function* (keystore, afterDatabaseInited) {
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
