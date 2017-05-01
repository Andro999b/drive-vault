import { createAction } from 'redux-actions';

export default createAction('SET_KEYSTORE', (keystore, keystoreRsa) => ({keystore, keystoreRsa}));