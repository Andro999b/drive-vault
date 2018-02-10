import {
    setMasterPasswordError,
    setPinCodeError,
    setSecret,
    setFileDecrypted,
    setFileLoading,
    setPinCodeAvaliable,
    clearDecryptErrors
} from 'actions';
import {
    DECRYPT_VAULT,
    DECRYPT_VAULT_BY_PIN_CODE,
    UPDATE_MASTER_PASSWORD,
    SET_PINCODE,
    selectGroup
} from 'actions/sagas';

import {
    save as saveDatabase,
    deserialize as deserializeDatabase,
    get as getDatabase
} from 'service/db';

import { createSecretPassphrase, encrypt, decrypt } from 'service/crypt';
import { isWeakPassword } from 'service/crypt/password';
import {
    SELECTED_GROUP_KEY,
    PINCODE_SALT_KEY,
    PINCODE_SECRET_KEY,
    getVaultSetting,
    setVaultSetting
} from 'service/settings';

import { put, takeLatest, select, call } from 'redux-saga/effects';

import {
    ERROR_CANT_BE_EMPTY,
    ERROR_WRONG_PASSWORD,
    ERROR_PASSWORD_TOO_WEAK,
    ERROR_PINCODE_PASSWORD_OUDATTED,
    ERROR_WRONG_PINCODE
} from 'service/validations';

import {
    hidePinDialog
} from 'actions/dialogs';

import uuidV4 from 'uuid/v4';

function* afterDatabaseInited() {
    yield put(setFileDecrypted(true));
    yield call(restoreLatestSelectGroup);
}

function* restoreLatestSelectGroup() {
    const db = getDatabase();
    const { fileId } = (yield select()).decrypt;
    const id = getVaultSetting(fileId, SELECTED_GROUP_KEY);

    const group = db.getGroup(id);
    if (!group) return;

    yield put(selectGroup(group));
}

function* decryptVaultByPinCode(action) {
    yield put(clearDecryptErrors());

    const pinCode = action.payload;
    const { fileId, fileData } = (yield select()).decrypt;

    const pinCodeSalt = getVaultSetting(fileId, PINCODE_SALT_KEY);
    const pinCodeSecret = getVaultSetting(fileId, PINCODE_SECRET_KEY);

    let secret;

    try {
        secret = decrypt(pinCodeSecret, createSecretPassphrase(pinCode, pinCodeSalt));
    } catch (e) {
        console.error(e);
        yield put(setPinCodeError(ERROR_WRONG_PINCODE));
        return;
    }

    try {
        const keystore = decrypt(fileData, secret);

        yield call(deserializeDatabase, keystore);
        yield call(afterDatabaseInited);
    } catch (e) {
        console.error(e);

        yield* clearPinCode();
        yield put(setMasterPasswordError(ERROR_PINCODE_PASSWORD_OUDATTED));
    }
}

function* decryptVault(action) {
    yield put(clearDecryptErrors());

    const password = action.payload;
    let { secret, fileData, salt } = (yield select()).decrypt;

    if (!password) {
        yield put(setMasterPasswordError(ERROR_CANT_BE_EMPTY));
        return;
    }

    secret = createSecretPassphrase(password, salt);
    if (fileData) {
        let keystore;
        try {
            keystore = decrypt(fileData, secret);
            yield put(setSecret(secret));
        } catch (e) {
            console.error(e);
            yield put(setMasterPasswordError(ERROR_WRONG_PASSWORD));
            return;
        }
        yield call(deserializeDatabase, keystore);
        yield call(afterDatabaseInited);
    } else {
        //check password security
        if (isWeakPassword(password)) {
            yield put(setMasterPasswordError(ERROR_PASSWORD_TOO_WEAK));
            return;
        }

        yield put(setSecret(secret));
        yield put(setFileLoading(true));
        yield call(deserializeDatabase, null);
        yield call(afterDatabaseInited);
    }
}

function* updateMasterPassword(action) {
    const password = action.payload;
    const { salt } = (yield select()).decrypt;
    const secret = createSecretPassphrase(password, salt);

    yield put(setSecret(secret));

    //force upload db
    saveDatabase();
}

function* setPinCode(action) {
    const pinCode = action.payload;
    const { fileId, secret } = (yield select()).decrypt;
    const salt = uuidV4();

    const pinCodeSecret = encrypt(secret, createSecretPassphrase(pinCode, salt));

    setVaultSetting(fileId, PINCODE_SALT_KEY, salt);
    setVaultSetting(fileId, PINCODE_SECRET_KEY, pinCodeSecret);

    yield put(hidePinDialog());
}

function* clearPinCode() {
    const { fileId } = (yield select()).decrypt;

    setVaultSetting(fileId, PINCODE_SALT_KEY, null);
    setVaultSetting(fileId, PINCODE_SECRET_KEY, null);

    yield put(setPinCodeAvaliable(false));
}

export default function* () {
    yield takeLatest(DECRYPT_VAULT, decryptVault);
    yield takeLatest(DECRYPT_VAULT_BY_PIN_CODE, decryptVaultByPinCode);
    yield takeLatest(UPDATE_MASTER_PASSWORD, updateMasterPassword);
    yield takeLatest(SET_PINCODE, setPinCode);
}