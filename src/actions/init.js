import auth from '../google/auth';

import {setAuthResult, setPasswordSalt} from '.';
import {loadStorage} from './storage';

export default () => (dispatch) => 
    auth
        .then((userinfo) => dispatch(setPasswordSalt(userinfo.getId())))
        .then(() => dispatch(loadStorage()))
        .then(() => dispatch(setAuthResult(true)))
        .catch((e) => {
            console.error(e);
            return dispatch(setAuthResult(false));
        });