import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dialog from './Dialog';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import { hideChangePasswordDialog } from 'actions/dialogs';
import { updateMasterPassword } from 'actions/sagas';

import { callOnEnter } from 'service/utils';
import { passwordValidator} from 'service/validations';

@connect(
    (state) => ({
        open: state.dialogs.changePassword
    }),
    (dispatch) => ({
        hideDialog: () => dispatch(hideChangePasswordDialog()),
        updateMasterPassword: (password) => dispatch(updateMasterPassword(password))
    })
)
class ChangePasswordDialog extends Component {
    static propTypes = {
        open: PropTypes.bool.isRequired,
        hideDialog: PropTypes.func.isRequired,
        updateMasterPassword: PropTypes.func.isRequired
    }

    state = {
        password: '',
        passwordError: null
    };

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

    onSave() {
        const { password } = this.state;
        const passwordError = passwordValidator(password);
        if (passwordError == null) {
            this.props.updateMasterPassword(password);
            this.props.hideDialog();
        } else {
            this.setState({ passwordError });
        }
    }

    render() {
        const { open, hideDialog } = this.props;
        const { password, passwordError } = this.state;

        const actions = [
            <FlatButton key={0} onClick={hideDialog} label="Cancel" primary />,
            <FlatButton key={1} onClick={this.onSave.bind(this)} label="Save" primary />,
        ];

        return (
            <Dialog open={open} title="Change Password" actions={actions} onRequestClose={hideDialog}>
                <TextField
                    autoFocus
                    onKeyDown={callOnEnter(this.onSave.bind(this))}
                    floatingLabelText="Enter new master password"
                    floatingLabelFixed
                    autoComplete="new-password"
                    errorText={passwordError}
                    fullWidth
                    type="password"
                    value={password}
                    onChange={this.onPasswordChange.bind(this)} />
                <div className='password-hint'>
                    Password must cointain one letter in uppercase and lowercase, one number and one special symbol. Minimal length 8 characters.
                </div>
            </Dialog>
        );
    }
}

export default ChangePasswordDialog;