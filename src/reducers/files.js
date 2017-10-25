import { handleActions } from 'redux-actions';

import * as actions from '../actions';

const initilaState = {
    list: [],
    fileListLoading: false,
    newFileNameError: null
};

export default handleActions({
    //common actions
    [actions.SET_FILES_LIST]: (state, action) => ({ ...state, list: action.payload }),
    [actions.SET_FILES_LIST_LOADING]: (state, action) => ({ ...state, fileListLoading: action.payload }),
    [actions.SET_NEW_FILE_NAME_ERROR]: (state, action) => ({ ...state, newFileNameError: action.payload})
}, initilaState);