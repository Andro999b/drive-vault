import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

import { ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import Group from './Group';
import RemoveGroupDialog from './RemoveGroupDialog';
import GroupDialog from './GroupDialog';

import { showCreateEditGroupDialog } from '../actions/dialogs';

@connect(
    (state) => ({
        groups: state.groups
    }),
    (dispatch) => ({
        showCreateDialog: () => dispatch(showCreateEditGroupDialog())
    })
)
class GroupsList extends Component {
    static propTypes ={
        showCreateDialog: PropTypes.func.isRequired,
        groups: PropTypes.array.isRequired,
    }

    render() {
        const { showCreateDialog, groups } = this.props;

        return (
            <div>
                <div>
                    <ListItem primaryText="All credentials"/>
                    {groups.map((group) => 
                        <Group key={group.id} group={group}/>
                    )}
                </div>
                <FlatButton
                    onTouchTap={showCreateDialog}
                    label="New group"
                    fullWidth
                    style={{
                        position: 'absolute',
                        bottom: 0
                    }} />
                <RemoveGroupDialog/>
                <GroupDialog/>
            </div>
        );
    }
}

export default GroupsList;