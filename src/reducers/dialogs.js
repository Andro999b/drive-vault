import { handleActions } from 'redux-actions';
import * as dialogsActions from '../actions/dialogs';

const initilaState = {
    removeGroup: null,
    removeCredential: null,
    removeFile: null,
    saveGroup: null,
    saveCredential: null,
    changePassword: false,
};

export default handleActions({
    //dialogs
    [dialogsActions.SET_REMOVE_GROUP]: (state, action) => ({ ...state, removeGroup: action.payload }),
    [dialogsActions.SET_SAVE_GROUP]: (state, action) => ({ ...state, saveGroup: action.payload }),
    [dialogsActions.SET_REMOVE_CREDENTIAL]: (state, action) => ({ ...state, removeCredential: action.payload }),
    [dialogsActions.SET_SAVE_CREDENTIAL]: (state, action) => {
        const credential = action.payload;

        // set selecetdGroup as credential group by default when create new
        if(credential != null && credential.groups == null && state.main.selectedGroup != null)
            credential.group = state.main.selectedGroup.id;

        return { ...state, saveCredential: credential };
    },
    [dialogsActions.SET_REMOVE_FILE]: (state, action) => ({ ...state, removeFile: action.payload }),
    [dialogsActions.SET_CHANGE_PASSWORD_DIALOG]: (state, action) => ({ ...state, changePassword: action.payload }),
}, initilaState);