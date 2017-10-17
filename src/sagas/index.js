import { fork, all } from 'redux-saga/effects';

import init from './init';
import password from './password';
import main from './main';

export default function* () {
    yield all([
        fork(init),
        fork(password),
        fork(main)
    ]);
}