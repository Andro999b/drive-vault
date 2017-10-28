import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { ListItem } from 'material-ui/List';
import Group from './Group';

import RemoveGroupDialog from './dialogs/RemoveGroupDialog';
import GroupDialog from './dialogs/GroupDialog';

import ContentAddCircleIcon from 'material-ui/svg-icons/content/add-circle';
import ActionAllIcon from 'material-ui/svg-icons/action/done-all';

import { showSaveGroupDialog } from 'actions/dialogs';

@connect(
    (state) => ({
        groups: state.main.groups
    }),
    (dispatch) => ({
        showCreateDialog: () => dispatch(showSaveGroupDialog())
    })
)
class GroupsList extends Component {
    static propTypes = {
        showCreateDialog: PropTypes.func.isRequired,
        groups: PropTypes.array.isRequired,
        selectGroup: PropTypes.func.isRequired
    }

    render() {
        const { showCreateDialog, selectGroup, groups } = this.props;

        return (
            <div>
                <div>
                    <ListItem
                        onTouchTap={() => selectGroup(null)}
                        primaryText="All credentials"
                        leftIcon={<ActionAllIcon/>} />
                    {groups.map((group) =>
                        <Group key={group.id} group={group} selectGroup={selectGroup} />
                    )}
                </div>
                <ListItem
                    onTouchTap={showCreateDialog}
                    primaryText="New group"
                    leftIcon={<ContentAddCircleIcon />}
                />
                <RemoveGroupDialog />
                <GroupDialog />
            </div>
        );
    }
}

export default GroupsList;