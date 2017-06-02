import {get as db} from '../db';
import {setSelectedGroup} from '.';
import {hideRemoveGroupDialog} from './dialogs';

export default (group) => (dispatch, getState) => {
    db().removeGroup(group);
    dispatch(hideRemoveGroupDialog());

    const selectedGroup = getState().selectedGroup;
    if(selectedGroup != null && selectedGroup.id == group.id)
        dispatch(setSelectedGroup(null));
};