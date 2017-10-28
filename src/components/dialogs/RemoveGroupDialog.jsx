import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Dialog from './Dialog';
import FlatButton from 'material-ui/FlatButton';

import { hideRemoveGroupDialog } from 'actions/dialogs';
import { removeGroup } from 'actions/sagas';

@connect(
    (state) => ({
        group: state.dialogs.removeGroup
    }),
    (dispatch) => ({
        hideDialog: () => dispatch(hideRemoveGroupDialog()),
        removeGroup: (group) => dispatch(removeGroup(group))
    })
)
class RemoveGroupDialog extends Component {
    static propTypes = {
        group: PropTypes.object,
        hideDialog: PropTypes.func.isRequired,
        removeGroup: PropTypes.func.isRequired,
    };

    render() {
        const { group, hideDialog, removeGroup } = this.props;
        const name = group != null ? group.name : null;

        const actions = [
            <FlatButton key={0} onTouchTap={hideDialog} label="Cancel" primary />,
            <FlatButton key={1} onTouchTap={() => removeGroup(group)} label="Remove" primary />,
        ];

        return (
            <Dialog offMobileMode open={group != null} actions={actions} onRequestClose={hideDialog}>
                Remove group {name} ? 
            </Dialog>
        );
    }
}

export default RemoveGroupDialog;