import { handleActions } from 'redux-actions';

import * as actions from '../actions';

const initilaState = {
    list: []
};

export default handleActions({
    //common actions
    [actions.SET_FILES_LIST]: (state, action) => ({ ...state, list: action.payload }),
}, initilaState);