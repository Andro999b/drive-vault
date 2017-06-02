import {get as db} from '../db';
import {hideSaveGroupDialog} from './dialogs';

export default (group) => (dispatch) => {
    db().saveGroup(group);
    dispatch(hideSaveGroupDialog());
};