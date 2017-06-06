import { setSelectedGroup } from '.';
import {get as db} from '../db';
import {SELECTED_GROUP_KEY, setSetting} from '../settings';

export default (group) => (dispatch) => {
    db().setFilterGroup(group);
    dispatch(setSelectedGroup(group));

    if(group) {
        setSetting(SELECTED_GROUP_KEY, group.id);
    } else {
        setSetting(SELECTED_GROUP_KEY, null);
    }
};
