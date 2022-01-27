import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dialog from './Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { hideExportDialog } from 'actions/dialogs';
import { exportVault } from 'actions/sagas';

import { passwordValidator } from 'service/validations';
import { callOnEnter } from 'service/utils';

@connect(
    (state) => ({
        open: state.dialogs.export
    }),
    (dispatch) => ({
        hideDialog: () => dispatch(hideExportDialog()),
        exportVault: (password) => dispatch(exportVault(password)),
    })
)
class ExportDialog extends Component {
    static propTypes = {
        open: PropTypes.bool,
        hideDialog: PropTypes.func.isRequired,
        exportVault: PropTypes.func.isRequired
    };

    state = {
        password: '',
        passwordError: null
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.open) {
            this.setState({
                password: '',
                passwordError: null
            });
        }
    }

    onPasswordChange(e) {
        const password = e.target.value;
        this.setState({ password, passwordError: null });
    }

    onExport() {
        const { password } = this.state;
        const passwordError = passwordValidator(password);
        if (passwordError == null) {
            this.props.exportVault(password);
        } else {
            this.setState({ passwordError });
        }
    }

    render() {
        const { open, hideDialog } = this.props;
        const { passwordError, password } = this.state;

        const actions = [
            <FlatButton key={0} onClick={() => hideDialog()} label="Cancel" primary />,
            <FlatButton key={1} onClick={this.onExport.bind(this)} label="Export" primary />,
        ];

        return (
            <Dialog open={open} title="Export vault" actions={actions}>
                You are exporting vault into your local filesystem. Please enter password to encrypt file.
                <TextField
                    autoFocus
                    onKeyDown={callOnEnter(this.onExport.bind(this))}
                    value={password}
                    errorText={passwordError}
                    onChange={this.onPasswordChange.bind(this)}
                    type="password"
                    floatingLabelText="Enter password"
                    floatingLabelFixed
                    autoComplete="new-password"
                    fullWidth />
                <div className='password-hint'>
                    Password must cointain one letter in uppercase and lowercase, one number and one special symbol. Minimal length 8 characters.
                </div>
            </Dialog>
        );
    }
}

export default ExportDialog;