import { CREATE_FILE } from '../actions/sagas';
import { setNewFileName, setNewFileNameError } from '../actions';

import { takeLatest, put, call } from 'redux-saga/effects';

import { validateFileName } from '../service/fs';

function* createFile(action) {
    const name = action.playload;

    const result = yield call(validateFileName, name);

    console.log(result);

    if (result.valid) {
        yield put(setNewFileName(name));
        yield put(setNewFileNameError(null));
    } else {
        yield put(setNewFileNameError(result.error));
    }
}

export default function* () {
    yield takeLatest(CREATE_FILE, createFile);
}