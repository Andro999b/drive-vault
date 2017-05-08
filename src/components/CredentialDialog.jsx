import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

class CredentialDialog extends Component {
    static propTypes = {
        credential: PropTypes.object
    };

    render() {
        const { credential } = this.props;
        let group, name, value;

        if (credential)
            ({ group, name, value } = credential);

        const actions = [
            <FlatButton key={0} label="Cancel"primary/>,
            <FlatButton key={1} label="Save" primary/>,
        ];

        return (
            <Dialog title="Credential" open={credential != null} actions={actions}>
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