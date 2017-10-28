import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dialog from './Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { hideExportDialog } from 'actions/dialogs';

@connect(
    (state) => ({
        open: state.dialogs.export
    }),
    (dispatch) => ({
        hideDialog: () => dispatch(hideExportDialog())
    })
)
class ExportDialog extends Component {
    static propTypes = {
        open: PropTypes.bool,
        hideDialog: PropTypes.func.isRequired
    };

    render() {
        const { open, hideDialog } = this.props;

        const actions = [
            <FlatButton key={0} onTouchTap={hideDialog} label="Cancel" primary />,
            <FlatButton key={1} label="Export" primary />,
        ];

        return (
            <Dialog open={open} title="Export database" actions={actions}>
                You are exporting database into your local filesystem. Please enter password to encrypt file.
                <TextField
                    autoFocus
                    floatingLabelText="Enter pasword"
                    autoComplete="new-password"
                    fullWidth/>
            </Dialog>
        );
    }
}

export default ExportDialog;