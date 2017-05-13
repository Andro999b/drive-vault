import { createAction } from 'redux-actions';

export const showToast = createAction('SET_TOAST_MSG', (msg) => msg);
export const hideToast = createAction('SET_TOAST_MSG', () => null);