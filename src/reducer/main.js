import { handleActions } from 'redux-actions';

import * as actions from '../actions';
import * as dialogsActions from '../actions/dialogs';
import * as toasActions from '../actions/toast';

const initilaState = {
    groups: [],
    credentials: [],
    selectedGroup: null,
    toastMsg: null,
    removeGroup: null,
    removeCredential: null,
    saveGroup: null,
    saveCredential: null,
    changePasswordDialog: false,
};

export default handleActions({
    //common actions
    [actions.SET_GROUPS]: (state, action) => ({ ...state, groups: action.payload }),
    [actions.SET_CREDENTIALS]: (state, action) => ({ ...state, credentials: action.payload }),
    [actions.SET_SELECTED_GROUP]: (state, action) => ({ ...state, selectedGroup: action.payload }),
    //toast
    [toasActions.SET_TOAST_MSG]: (state, action) => ({ ...state, toastMsg: action.payload }),
    //dialogs
    [dialogsActions.SET_REMOVE_GROUP]: (state, action) => ({ ...state, removeGroup: action.payload }),
    [dialogsActions.SET_SAVE_GROUP]: (state, action) => ({ ...state, saveGroup: action.payload }),
    [dialogsActions.SET_REMOVE_CREDENTIAL]: (state, action) => ({ ...state, removeCredential: action.payload }),
    [dialogsActions.SET_SAVE_CREDENTIAL]: (state, action) => {
        const credential = action.payload;

        // set selecetdGroup as credential group by default when create new
        if(credential != null && credential.groups == null && state.selectedGroup != null)
            credential.group = state.selectedGroup.id;

        return { ...state, saveCredential: credential };
    },
    [dialogsActions.SET_CHANGE_PASSWORD_DIALOG]: (state, action) => ({ ...state, changePasswordDialog: action.payload }),
}, initilaState);