import { INIT, INIT_FINISH} from 'actions/sagas';
import { setPasswordSalt, setInitError, setFilesList } from 'actions';

import { getUserId } from 'service/account';
import { fileList } from 'service/fs';

import { put, takeLatest, call } from 'redux-saga/effects';

function* init() {
    try {
        const uid = yield call(getUserId);
        const files = yield call(fileList);

        yield put(setFilesList(files));
        yield put(setPasswordSalt(uid));
    } catch (e) {
        console.error(e);
        yield put(setInitError('Fail to start'));
    }

    yield put({type: INIT_FINISH});
}

export default function* () {
    yield takeLatest(INIT, init);   
}