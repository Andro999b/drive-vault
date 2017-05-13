import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import { hideCreateEditCredentialDialog } from '../actions/dialogs';

@connect(
    (state) => ({
        credential: state.createEditCredential
    }),
    (dispatch) => ({
        hideDialog: () => dispatch(hideCreateEditCredentialDialog())
    })
)
class CredentialDialog extends Component {
    static propTypes = {
        credential: PropTypes.object,
        hideDialog: PropTypes.func.isRequired,
    };

    render() {
        const { credential, hideDialog } = this.props;
        let group, name, value;

        if (credential != null)
            ({ group, name, value } = credential);

        const actions = [
            <FlatButton key={0} onTouchTap={hideDialog} label="Cancel" primary/>,
            <FlatButton key={1} label="Save" primary/>,
        ];

        return (
            <Dialog 
                title="Credential" 
                open={credential != null} 
                actions={actions}
                onRequestClose={hideDialog}
                >
                <form autoComplete="off">
                    <SelectField floatingLabelText="Select Group" fullWidth value={group}>
                        <MenuItem value={null} primaryText="None" />
                    </SelectField>
                    <TextField floatingLabelText="Enter name" autoComplete="new-password" fullWidth value={name} />
                    <TextField floatingLabelText="Enter value" type="password" autoComplete="new-password" fullWidth value={value} />
                </form>
            </Dialog>
        );
    }
}

export default CredentialDialog;