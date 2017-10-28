import { INIT, INIT_FINISH} from 'actions/sagas';
import { setPasswordSalt, setInitError, setFilesList } from 'actions';

import auth from 'service/google/auth';
import { fileList } from 'service/fs';

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

export default function* () {
    yield takeLatest(INIT, init);   
}