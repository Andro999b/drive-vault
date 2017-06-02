import { handleActions } from 'redux-actions';

const initilaState = {
    authResult: false,
    dbInited: false,
    masterPasswordError: null,
    groups: [],
    credentials: [],
    selectedGroup: null,
    fileId: null,
    fileData: null,
    salt: null,
    toastMsg: null,
    removeGroup: null,
    removeCredential: null,
    saveGroup: null,
    saveCredential: null
};

export default handleActions({
    'SET_FILE': (state, action) => ({ ...state, fileData: action.payload.data, fileId: action.payload.id }),
    'SET_PASSWORD_SALT': (state, action) => ({ ...state, salt: action.payload }),
    'SET_MASTER_PASSWORD_ERROR': (state, action) => ({ ...state, masterPasswordError: action.payload }),
    'SET_AUTH_RESULT': (state, action) => ({ ...state, authResult: action.payload }),
    'SET_DB_INITED': (state) => ({
        ...state,
        dbInited: true,
        fileData: undefined,
        salt: undefined,
        masterPasswordError: null
    }),
    'SET_TOAST_MSG': (state, action) => ({ ...state, toastMsg: action.payload }),
    'SET_REMOVE_GROUP': (state, action) => ({ ...state, removeGroup: action.payload }),
    'SET_SAVE_GROUP': (state, action) => ({ ...state, saveGroup: action.payload }),
    'SET_REMOVE_CREDENTIAL': (state, action) => ({ ...state, removeCredential: action.payload }),
    'SET_SAVE_CREDENTIAL': (state, action) => {
        const credential = action.payload;

        // set selecetdGroup as credential group by default when create new
        if(credential != null && credential.groups == null && state.selectedGroup != null)
            credential.group = state.selectedGroup.id;

        return { ...state, saveCredential: credential };
    },
    'SET_GROUPS': (state, action) => ({ ...state, groups: action.payload }),
    'SET_CREDENTIALS': (state, action) => ({ ...state, credentials: action.payload }),
    'SET_SELECTED_GROUP': (state, action) => ({ ...state, selectedGroup: action.payload }),
}, initilaState);