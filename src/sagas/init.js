import { INIT, INIT_FINISH, DOWNLOAD_FILE} from '../actions/sagas';
import { setPasswordSalt, setInitError, setFilesList, setFile, setFileLoading } from '../actions';

import auth from '../service/google/auth';
import { fileList, download } from '../service/fs';

import { put, takeLatest, call } from 'redux-saga/effects';

function* init() {
    try {
        const userinfo = yield call(auth);
        const files = yield call(fileList);

        yield put(setFilesList(files));
        yield put(setPasswordSalt(userinfo.getId()));
    } catch (e) {
        console.error(e);
        yield put(setInitError('Fail to start'));
    }

    yield put({type: INIT_FINISH});
}

function* downloadFile(action) {
    const fileId = action.payload;

    yield put(setFileLoading(true));

    const fileData = yield call(download, fileId);

    yield put(setFile(fileId, fileData));
    yield put(setFileLoading(false));
}

export default function* () {
    yield takeLatest(INIT, init);
    yield takeLatest(DOWNLOAD_FILE, downloadFile);
}