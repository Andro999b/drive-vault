import { createAction } from 'redux-actions';

export const SET_TOAST_MSG = 'SET_TOAST_MSG';

export const showToast = createAction(SET_TOAST_MSG, (msg) => msg);
export const hideToast = createAction(SET_TOAST_MSG, () => null);