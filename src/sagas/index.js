import { fork, all } from 'redux-saga/effects';

import init from './init';
import setMassterPassword from './setMasterPassword';
import list from './list';

export default function* () {
    yield all([
        fork(init),
        fork(setMassterPassword),
        fork(list)
    ]);
}