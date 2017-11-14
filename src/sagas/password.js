import { setMasterPasswordError, setSecret, setDatabaseInited} from 'actions';
import { SET_MASTER_PASSWORD, UPDATE_MASTER_PASSWORD, selectGroup, } from 'actions/sagas';

import { 
    save as saveDatabase,
    deserialize as deserializeDatabase, 
    get as getDatabase 
} from 'service/db';

import { createSecret, decrypt } from 'service/crypt';
import { isWeakPassword } from 'service/crypt/password';
import { SELECTED_GROUP_KEY, getSetting } from 'service/settings';

import { put, takeLatest, select, call } from 'redux-saga/effects';

import history from 'service/history';

import { 
    ERROR_CANT_BE_EMPTY, 
    ERROR_WRONG_PASSWORD,
    ERROR_PASSWORD_TOO_WEAK 
} from 'service/validations';

function* afterDatabaseInited() {
    yield put(setDatabaseInited());//TODO remove
    yield call(restoreLatestSelectGroup);
    
    history.push('/list');
}

function* restoreLatestSelectGroup() {
    const db = getDatabase();
    const id = getSetting(SELECTED_GROUP_KEY);

    const group = db.getGroup(id);
    if (!group) return;

    yield put(selectGroup(group));
}

function* setMasterPassword(action) {
    const password = action.payload;
    let { secret, fileData, salt } = (yield select()).decrypt;

    if (secret) return;

    if (!password) {
        yield put(setMasterPasswordError(ERROR_CANT_BE_EMPTY));
        return;
    }

    secret = createSecret(password, salt);
    if (fileData) {
        let keystore;
        try {
            keystore = decrypt(fileData, secret);
            yield put(setSecret(secret));
        } catch (e) {
            console.error(e);
            yield put(setMasterPasswordError(ERROR_WRONG_PASSWORD));
            return;
        }
        yield call(deserializeDatabase, keystore);
        yield call(afterDatabaseInited);
    } else {
        //check password security
        if (isWeakPassword(password)) {
            yield put(setMasterPasswordError(ERROR_PASSWORD_TOO_WEAK));
            return;
        }

        yield put(setSecret(secret));
        yield call(deserializeDatabase, null);
        yield call(afterDatabaseInited);
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