import { 
    setFile, 
    setGroups, 
    setCredentials, 
    setSetSyncStatus,
    setFileLoading
} from 'actions';
import { UPLOAD_DATABASE, uploadDatabase } from 'actions/sagas';
import { showToast } from 'actions/toast';

import { encrypt } from 'service/crypt';

import { connect } from 'service/db';
import { DIRTY, SYNCRONIZED, SYNCRONIZATION_INPROGRESS } from 'service/db/sync-status';
import { upload } from 'service/fs';

import { put, select, take, takeLatest, call, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import history from 'service/history';

const DB_EVENT_SAVE = 'db_save';
const DB_EVENT_CHANGED = 'db_changed';
const DB_EVENT_GROUPS_UPDATED = 'db_groups_updated';
const DB_EVENT_CREDENTIALS_UPDATED = 'db_creadential_updated';

function* saveDataBase(action) {
    try {
        const { keystore } = action.payload;
        const { fileId, fileName, secret } = (yield select()).decrypt;

        if(!fileId && !fileName) { 
            yield put(setSetSyncStatus(SYNCRONIZED));
            return;
        }

        //set sync status in progress
        yield put(setSetSyncStatus(SYNCRONIZATION_INPROGRESS));

        // do file upload
        const file = yield call(upload, { fileId, fileName, body: encrypt(keystore, secret) });
        yield put(setFile(file.id));

        if(!fileId) { //new file created
            yield put(setFileLoading(false));
            history.push('/vault/' + file.id);
        }

        yield put(showToast('Database synchronized'));

        // set sync as finished
        const { syncStatus } = (yield select()).main;

        if(syncStatus == SYNCRONIZATION_INPROGRESS) 
            yield put(setSetSyncStatus(SYNCRONIZED));
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

function* connectToDatabase() {   
    const dbChannel = eventChannel((emmiter) => {
        connect({
            onGoupsUpdated: (groups) => emmiter({ type: DB_EVENT_GROUPS_UPDATED, payload: groups }),
            onCredentialsUpdated: (credentials) => emmiter({ type: DB_EVENT_CREDENTIALS_UPDATED, payload: credentials }),
            onDatabaseSave: (keystore) => emmiter({ type: DB_EVENT_SAVE, payload: keystore }),
            onDatabaseChanged: () => emmiter({ type: DB_EVENT_CHANGED })
        });
        return () => null;
    });

    try {
        while (true) {
            const action = yield take(dbChannel);
            switch (action.type) {
                case DB_EVENT_SAVE: yield put(uploadDatabase(action.payload)); break;
                case DB_EVENT_CHANGED: yield put(setSetSyncStatus(DIRTY)); break;
                case DB_EVENT_GROUPS_UPDATED: yield call(updateGroups, action); break;
                case DB_EVENT_CREDENTIALS_UPDATED: yield call(updateCredentials, action); break;
            }
        }
    } catch (e) {
        console.error(e);
    }
}

export default function* () {
    yield takeLatest(UPLOAD_DATABASE, saveDataBase);

    //connect to db event;
    yield fork(connectToDatabase);
}
