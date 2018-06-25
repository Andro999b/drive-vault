import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import { ListItem } from 'material-ui/List';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import { showSaveGroupDialog, showRemoveGroupDialog } from 'actions/dialogs';

@connect(
    null,
    (dispatch) => ({
        showEditDialog: (group) => dispatch(showSaveGroupDialog(group)),
        showRemoveDialog: (group) => dispatch(showRemoveGroupDialog(group))
    })
)
class Group extends Component {
    static propTypes = {
        group: PropTypes.object.isRequired,
        showEditDialog: PropTypes.func.isRequired,
        showRemoveDialog: PropTypes.func.isRequired,
        selectGroup: PropTypes.func.isRequired
    };

    render() {
        const { group, showEditDialog, showRemoveDialog, selectGroup } = this.props;

        const rightIconMenu = (
            <IconMenu useLayerForClickAway iconButtonElement={
                <IconButton touch>
                    <MoreVertIcon />
                </IconButton>
            }>
                <MenuItem onClick={() => showEditDialog(group)}>Edit</MenuItem>
                <MenuItem onClick={() => showRemoveDialog(group)}>Remove</MenuItem>
            </IconMenu>
        );

        return (
            <ListItem
                onClick={() => selectGroup(group)}
                primaryText={group.name}
                rightIconButton={rightIconMenu}
            />
        );
    }
}

export default Group;