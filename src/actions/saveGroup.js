import {get as db} from '../db';
import {setSelectedGroup} from '.';
import {hideSaveGroupDialog} from './dialogs';

export default (group) => (dispatch, getState) => {
    db().saveGroup(group);
    dispatch(hideSaveGroupDialog());

    const selectedGroup = getState().selectedGroup;
    if(selectedGroup != null && selectedGroup.id == group.id)
        dispatch(setSelectedGroup(group));
};