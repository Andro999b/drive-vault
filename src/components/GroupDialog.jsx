import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { hideCreateEditGroupDialog } from '../actions/dialogs';

@connect(
    (state) => ({
        group: state.createEditGroup
    }),
    (dispatch) => ({
        hideDialog: () => dispatch(hideCreateEditGroupDialog())
    })
)
class GroupDialog extends Component {
    static propTypes = {
        group: PropTypes.object,
        hideDialog: PropTypes.func.isRequired,
    };

    render() {
        const { group, hideDialog } = this.props;
        let name;
        
        if (group != null)
            ({ name } = group);

        const actions = [
            <FlatButton key={0} onTouchTap={hideDialog} label="Cancel"primary/>,
            <FlatButton key={1} label="Save" primary/>,
        ];

        return (
            <Dialog title="Group" open={group != null} actions={actions} onRequestClose={hideDialog}>
                <form autoComplete="off">
                    <TextField floatingLabelText="Group name" autoComplete="new-password" fullWidth value={name} />
                </form>
            </Dialog>
        );
    }
}

export default GroupDialog;