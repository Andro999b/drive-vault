import auth from '../google/auth';

import authResult from './authResult';
import {loadStorage} from './storage';
import setPasswordSalt from './setPasswordSalt';

export default () => (dispatch) => 
    auth
        .then((userinfo) => dispatch(setPasswordSalt(userinfo.getId())))
        .then(() => dispatch(loadStorage()))
        .then(() => dispatch(authResult(true)))
        .catch((e) => {
            console.error(e);
            return dispatch(authResult(false));
        });