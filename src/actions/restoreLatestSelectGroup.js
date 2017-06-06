import {get as db} from '../db';
import {SELECTED_GROUP_KEY, getSetting} from '../settings';
import selectGroup from './selectGroup';

export default () => (dispatch) => {
    const id = getSetting(SELECTED_GROUP_KEY);

    if(!id) return;

    const group = db().getGroup(id);

    if(!group) return;

    dispatch(selectGroup(group));
};