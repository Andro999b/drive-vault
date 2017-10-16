import auth from '../google/auth';
import { fileList, download } from '../fs';

import { setPasswordSalt, setAuthResult, setFile } from '../actions';
import { put, takeLatest, call } from 'redux-saga/effects';
import { INIT, INIT_FINISH} from './actions';

function* initFileList() {
    try {
        const files = yield call(fileList);

        if (files.length > 0) {
            const id = files[0].id;
            const data = yield call(download, id);
            yield put(setFile(id, data));
        }
    } catch (e) {
        console.error(e);
    }
}

function* init() {
    try {
        const userinfo = yield call(auth);
        yield put(setPasswordSalt(userinfo.getId()));
        yield put(setAuthResult(true));
    } catch (e) {
        console.error(e);
        yield put(setAuthResult(false));
    }

    yield call(initFileList);

    yield put({type: INIT_FINISH});
}

export default function* () {
    yield takeLatest(INIT, init);
}