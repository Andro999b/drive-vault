import { IMPORT_VAULT, EXPORT_VAULT, selectGroup } from 'actions/sagas';
import { takeLatest, put, call } from 'redux-saga/effects';
import { serialize, deserialize } from 'service/db';
import { createSecret, decrypt, encrypt } from 'service/crypt';
import { hideExportDialog, hideImportDialog, showImportDialogError } from 'actions/dialogs';
import { saveAs } from 'file-saver';

import { ERROR_CANT_BE_EMPTY, ERROR_WRONG_PASSWORD } from 'service/validations';
 
const EXPORT_IMPORT_SALT = 'BNwhkbbaGyluMRNh62xh'; 

function readFile(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsText(file, 'utf-8');
        fileReader.onerror = reject;
        fileReader.onload = () => resolve(fileReader.result);
    });
}

function* importVault(action) {
    const { password, file} = action.payload;

    if (!password) {
        yield put(showImportDialogError(ERROR_CANT_BE_EMPTY));
        return;
    }

    const secret = createSecret(password, EXPORT_IMPORT_SALT);
    const fileContent = yield call(readFile, file);

    if (!fileContent) {
        yield put(showImportDialogError('Can`t decrypt empty file'));
        return;
    }

    try {
        const keystore = decrypt(fileContent, secret);
        yield put(hideImportDialog());
        yield call(deserialize, keystore);
    } catch (e) {
        console.error(e);
        yield put(showImportDialogError(ERROR_WRONG_PASSWORD));
        return;
    }

    yield put(selectGroup(null));
}

function* exportVault(action) {
    const password = action.payload;
    const secret = createSecret(password, EXPORT_IMPORT_SALT);
    const serializedDb = serialize();
    const output = encrypt(serializedDb, secret);

    var blob = new Blob([output], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'vault.backup');

    yield put(hideExportDialog());
}

export default function* () {
    yield takeLatest(IMPORT_VAULT, importVault);
    yield takeLatest(EXPORT_VAULT, exportVault);
}