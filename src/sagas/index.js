import { fork, all } from 'redux-saga/effects';

import init from './init';
import database from './database';
import password from './password';
import main from './main';
import files from './files';
import importExport from './import-export';

export default function* () {
    yield all([
        fork(init),
        fork(database),
        fork(password),
        fork(main),
        fork(files),
        fork(importExport)
    ]);
}