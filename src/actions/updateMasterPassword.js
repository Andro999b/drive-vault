import { setSecret } from '.';
import { createSecret } from '../crypt';
import { save as saveDatabase } from '../db';

export default (password) => (dispatch, getState) => {
    const {salt} = getState();
    const secret = createSecret(password, salt);

    dispatch(setSecret(secret));

    //force upload db
    saveDatabase();
};