import { setSelectedGroup } from '.';
import {get as db} from '../db';

export default (group) => (dispatch) => {
    db().setFilterGroup(group);
    dispatch(setSelectedGroup(group));
};
