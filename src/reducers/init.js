import { handleActions } from 'redux-actions';

import * as actions from 'actions';

const initilaState = {
    error: null,
    
};

export default handleActions({
    //common actions
    [actions.SET_INIT_ERROR]: (state, action) => ({ ...state, error: action.payload })
}, initilaState);