import { handleActions } from 'redux-actions';

import * as actions from '../actions';

const initilaState = {
    db: false,
    masterPasswordError: null,
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
    [actions.SET_MASTER_PASSWORD_ERROR]: (state, action) => ({ ...state, masterPasswordError: action.payload }),
    [actions.SET_DB_INITED]: (state) => ({
        ...state,
        db: true,
        fileData: undefined,
        masterPasswordError: null
    }),
    [actions.SET_SECRET]: (state, action) => ({ ...state, secret: action.payload }),
}, initilaState);