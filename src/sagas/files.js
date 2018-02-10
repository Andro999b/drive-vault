import { 
    CREATE_FILE, 
    DOWNLOAD_FILE, 
    REMOVE_FILE, 
    CLOSE_FILE
} from 'actions/sagas';
import { hideRemoveFileDialog } from 'actions/dialogs';
import {
    setNewFileName,
    setNewFileNameError,
    setFileLoading,
    setFilesListLoading,
    setFile,
    setFilesList,
    setFileDecrypted,
    setPinCodeAvaliable,
    clearDecryptErrors
} from 'actions';

import { takeLatest, put, call, throttle } from 'redux-saga/effects';

import { validateFileName, download, remove, fileList } from 'service/fs';

import history from 'service/history';

import {   
    PINCODE_SALT_KEY, 
    PINCODE_SECRET_KEY,
    getVaultSetting
} from 'service/settings';

function* createFile(action) {
    const name = action.payload;

    yield put(clearDecryptErrors());
    
    const result = yield call(validateFileName, name);

    if (result.valid) {
        yield put(setFile());
        yield put(setNewFileName(name));
        yield put(setNewFileNameError(null));
        yield put(setFileDecrypted(false));

        history.push('/vault/new');
    } else {
        yield put(setNewFileNameError(result.error));
    }
}

function* downloadFile(action) {
    const fileId = action.payload;

    yield put(clearDecryptErrors());
    yield put(setFile(fileId));
    yield put(setFileLoading(true));
    yield put(setFileDecrypted(false));

    history.push('/vault/' + fileId);

    //todo: get file metadata
    
    const pinCodeAvalaible = 
        getVaultSetting(fileId, PINCODE_SALT_KEY) != null && 
        getVaultSetting(fileId, PINCODE_SECRET_KEY) != null;

    yield put(setPinCodeAvaliable(pinCodeAvalaible));

    const fileData = yield call(download, fileId);

    yield put(setFile(fileId, fileData));
    yield put(setFileLoading(false));
}

function* removeFile(action) {
    const file = action.payload;

    yield put(setFilesListLoading(true));
    yield put(hideRemoveFileDialog());

    try {
        yield call(remove, file.id);
    } catch (e) {
        console.error(e);
    }

    const files = yield call(fileList);
    yield put(setFilesList(files));
    yield put(setFilesListLoading(false));
}

function* closeFile() {
    yield put(setFile());
    yield put(setNewFileNameError(null));
    yield put(setFileDecrypted(false));

    history.push('/');

    yield put(setFilesListLoading(true));

    const files = yield call(fileList);

    yield put(setFilesList(files));
    yield put(setFilesListLoading(false));
}

export default function* () {
    yield throttle(5000, CREATE_FILE, createFile);
    yield takeLatest(DOWNLOAD_FILE, downloadFile);
    yield takeLatest(REMOVE_FILE, removeFile);
    yield takeLatest(CLOSE_FILE, closeFile);
}