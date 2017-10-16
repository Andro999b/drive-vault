import {
    SAVE_CREDENTIAL,
    SAVE_GROUP,
    REMOVE_CREDENTIAL,
    REMOVE_GROUP,
    SELECT_GROUP,
    SET_NAME_FILTER,
    UPDATE_MASTER_PASSWORD
} from './actions';

import { put, takeLatest, select, cps, call } from 'redux-saga/effects';

import { get as db, save as saveDatabase } from '../db';
import { SELECTED_GROUP_KEY, setSetting } from '../settings';

import { setSelectedGroup, setSecret } from '../actions/';
import { createSecret } from '../crypt';

import {
    hideRemoveCredentialDialog,
    hideRemoveGroupDialog,
    hideSaveCredentialDialog,
    hideSaveGroupDialog
} from '../actions/dialogs';

function* removeGroup(action) {
    const group = action.payload;

    db().removeGroup(group);
    yield put(hideRemoveGroupDialog());

    const { selectedGroup } = yield select();
    if (selectedGroup != null && selectedGroup.id == group.id)
        yield call(selectGroup, { payload: null });
}

function* removeCredential(action) {
    const credential = action.payload;
    db().removeCredential(credential);
    yield put(hideRemoveCredentialDialog());
}

function* saveCredential(action) {
    const credential = action.payload;
    db().saveCredential(credential);
    yield put(hideSaveCredentialDialog());
}

function* saveGruop(action) {
    const group = action.payload;

    db().saveGroup(group);
    yield put(hideSaveGroupDialog());
    yield call(selectGroup, { payload: group });
}

function* selectGroup(action) {
    const group = action.payload;

    db().setFilterGroup(group);
    yield put(setSelectedGroup(group));

    if (group) {
        setSetting(SELECTED_GROUP_KEY, group.id);
    } else {
        setSetting(SELECTED_GROUP_KEY, null);
    }
}

function* setNameFilter(action) {
    yield cps(() => db().setFilterName(action.payload));
}

function* updateMasterPassword(action) {
    const password = action.payload;
    const { salt } = yield select();
    const secret = createSecret(password, salt);

    yield put(setSecret(secret));

    //force upload db
    saveDatabase();
}

export default function* () {
    yield takeLatest(REMOVE_CREDENTIAL, removeCredential);
    yield takeLatest(REMOVE_GROUP, removeGroup);
    yield takeLatest(SAVE_CREDENTIAL, saveCredential);
    yield takeLatest(SAVE_GROUP, saveGruop);
    yield takeLatest(SELECT_GROUP, selectGroup);
    yield takeLatest(SET_NAME_FILTER, setNameFilter);
    yield takeLatest(UPDATE_MASTER_PASSWORD, updateMasterPassword);
}