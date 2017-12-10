import {
    SAVE_CREDENTIAL,
    SAVE_GROUP,
    REMOVE_CREDENTIAL,
    REMOVE_GROUP,
    SELECT_GROUP,
    SET_NAME_FILTER,
    CLOSE_VAULT,
    closeFile
} from 'actions/sagas';
import { setSelectedGroup } from 'actions/';

import { get as db, clear as clearDatabase } from 'service/db';
import { SELECTED_GROUP_KEY, setSetting } from 'service/settings';

import { put, takeLatest, select, call } from 'redux-saga/effects';

import {
    hideRemoveCredentialDialog,
    hideRemoveGroupDialog,
    hideSaveCredentialDialog,
    hideSaveGroupDialog
} from 'actions/dialogs';

function* removeGroup(action) {
    const group = action.payload;

    db().removeGroup(group);
    yield put(hideRemoveGroupDialog());

    const { selectedGroup } = (yield select()).main;
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
    yield call(() => db().setFilterName(action.payload));
}

function* closeVault() {
    yield put(closeFile());
    yield call(clearDatabase);
}

export default function* () {
    yield takeLatest(REMOVE_CREDENTIAL, removeCredential);
    yield takeLatest(REMOVE_GROUP, removeGroup);
    yield takeLatest(SAVE_CREDENTIAL, saveCredential);
    yield takeLatest(SAVE_GROUP, saveGruop);
    yield takeLatest(SELECT_GROUP, selectGroup);
    yield takeLatest(SET_NAME_FILTER, setNameFilter);
    yield takeLatest(CLOSE_VAULT, closeVault);
}