import { handleActions } from 'redux-actions';

const initilaState = {
    authResult: false,
    dbInited: false,
    masterPasswordError: null,
    keystore: null,
    groups: [{
        id: 1,
        name: 'Test group'
    }],
    credentials: [
        {
            id: 1,
            name: 'Test name',
            value: 'Test value',
        },
        {
            id: 2,
            name: 'Test name',
            value: 'Test value',
        },
        {
            id: 3,
            name: 'Test name',
            value: 'Test value',
        },
        {
            id: 4,
            name: 'Test name',
            value: 'Test value',
        },
        {
            id: 5,
            name: 'Test name',
            value: 'Test value',
        },
        {
            id: 6,
            name: 'Test name',
            value: 'Test value',
        },
        {
            id: 7,
            name: 'Test name',
            value: 'Test value',
        },
        {
            id: 8,
            name: 'Test name',
            value: 'Test value',
        },
        {
            id: 9,
            name: 'Test name',
            value: 'Test value',
        },
        {
            id: 10,
            name: 'Test name',
            value: 'Test value',
        },
        {
            id: 11,
            name: 'Test name',
            value: 'Test value',
        }
    ],
    selectedGroup: null,
    encryptedData: null,
    passwordSalt: null,
    toastMsg: null,
    removeGroup: null,
    removeCredential: null,
    createEditGroup: null,
    createEditCredential: null
};

export default handleActions({
    'SET_ENCRYPTED_DATA': (state, action) => ({ ...state, encryptedData: action.payload }),
    'SET_PASSWORD_SALT': (state, action) => ({ ...state, passwordSalt: action.payload }),
    'SET_MASTER_PASSWORD_ERROR': (state, action) => ({ ...state, masterPasswordRsa: null, masterPasswordError: action.payload }),
    'SET_AUTH_RESULT': (state, action) => ({ ...state, authResult: action.payload }),
    'SET_DB_INITED': (state) => ({
        ...state,
        dbInited: true,
        encryptedData: null,
        passwordSalt: null,
        masterPasswordError: null
    }),
    'SET_TOAST_MSG': (state, action) => ({ ...state, toastMsg: action.payload }),
    'SET_REMOVE_GROUP': (state, action) => ({ ...state, removeGroup: action.payload }),
    'SET_CREATE_EDIT_GROUP': (state, action) => ({ ...state, createEditGroup: action.payload }),
    'SET_REMOVE_CREDENTIAL': (state, action) => ({ ...state, removeCredential: action.payload }),
    'SET_CREATE_EDIT_CREDENTIAL': (state, action) => ({ ...state, createEditCredential: action.payload }),
    'SET_GROUPS': (state, action) => ({ ...state, groups: action.payload }),
    'SET_COMPONENTS': (state, action) => ({ ...state, components: action.payload }),
    'SET_SELECTED_GROUP': (state, action) => ({ ...state, selectedGroup: action.payload }),
}, initilaState);