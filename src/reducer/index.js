import { handleActions } from 'redux-actions';

const initilaState = {
    authResult: false,
    keystoreRsa: null,
    masterPasswordError: null,
    keystore: null,
    encryptedData: null,
    passwordSalt: null
};

export default handleActions({
    'SET_ENCRYPTED_DATA': (state, action) => ({...state, encryptedData: action.payload}),
    'SET_PASSWORD_SALT': (state, action) => ({...state, passwordSalt: action.payload}),
    'SET_MASTER_PASSWORD_ERROR': (state, action) => ({...state, masterPasswordRsa: null, masterPasswordError: action.payload}),
    'SET_AUTH_RESULT': (state, action) => ({...state, authResult: action.payload}),
    'SET_KEYSTORE': (state, action) => ({
        ...state,
        ...action.payload, 
        encryptedData: null, 
        passwordSalt: null,
        masterPasswordError: null
    }),
}, initilaState);