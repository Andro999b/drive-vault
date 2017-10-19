import { CREATE_FILE, DOWNLOAD_FILE, REMOVE_FILE } from '../actions/sagas';
import { hideRemoveFileDialog } from '../actions/dialogs';
import { setNewFileName, setNewFileNameError, setFileLoading, setFile, setFilesList } from '../actions';

import { takeLatest, put, call } from 'redux-saga/effects';

import { validateFileName, download, remove, fileList } from '../service/fs';

import history from '../service/history';

function* createFile(action) {
    const name = action.payload;

    const result = yield call(validateFileName, name);

    if (result.valid) {
        yield put(setNewFileName(name));
        yield put(setNewFileNameError(null));
        history.push('/file/new');
    } else {
        yield put(setNewFileNameError(result.error));
    }
}

function* downloadFile(action) {
    const fileId = action.payload;

    yield put(setFileLoading(true));

    const fileData = yield call(download, fileId);

    yield put(setFile(fileId, fileData));
    yield put(setFileLoading(false));
}

function* removeFile(action) {
    const file = action.payload;

    try{
        yield call(remove, file.id);
    } finally {
        const files = yield call(fileList);
        yield put(setFilesList(files));
        yield put(hideRemoveFileDialog());
    }
}

export default function* () {
    yield takeLatest(CREATE_FILE, createFile);
    yield takeLatest(DOWNLOAD_FILE, downloadFile);
    yield takeLatest(REMOVE_FILE, removeFile);
}