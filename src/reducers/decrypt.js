import { handleActions } from 'redux-actions';

import * as actions from 'actions';

const initilaState = {
    decrypted: false,
    masterPasswordError: null,
    fileLoading: false,
    fileName: null,
    fileId: null,
    fileData: null,
    secret: null,
    salt: null
};

export default handleActions({
    //common actions
    [actions.SET_PASSWORD_SALT]: (state, action) => ({ ...state, salt: action.payload }),
    [actions.SET_FILE]: (state, action) => ({
        ...state,
        fileData: action.payload.data,
        fileId: action.payload.id,
        fileName: action.payload.name
    }),
    [actions.SET_NEW_FILE_NAME]: (state, action) => ({
        ...state, 
        fileName: action.payload,
        fileId: null,
        fileData: null 
     }),
    [actions.SET_FILE_LOADING]: (state, action) => ({ ...state, fileLoading: action.payload }),
    [actions.SET_MASTER_PASSWORD_ERROR]: (state, action) => ({ ...state, masterPasswordError: action.payload }),
    [actions.SET_FILE_DECRYPTED]: (state, action) => ({ 
        ...state,
        decrypted: action.payload,
        fileData: null 
    }),
    [actions.SET_SECRET]: (state, action) => ({ ...state, secret: action.payload }),
}, initilaState);