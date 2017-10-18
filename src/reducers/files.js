import { handleActions } from 'redux-actions';

import * as actions from '../actions';

const initilaState = {
    list: [],
    newFileNameError: null
};

export default handleActions({
    //common actions
    [actions.SET_FILES_LIST]: (state, action) => ({ ...state, list: action.payload }),
}, initilaState);