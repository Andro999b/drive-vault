import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { hideChangePasswordDialog } from '../actions/dialogs';
import { updateMasterPassword } from '../sagas/actions';
import { isWeakPassword } from '../crypt/password';

@connect(
    (state) => ({
        open: state.changePasswordDialog
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

    constructor(props, context) {
        super(props, context);
        
        this.state = {
            password: '',
            passwordError: null
        };
    }
    
    componentWillReceiveProps() {
        this.setState({
            password: '',
            passwordError: null
        });
    }

    onPasswordChange(e) {
        const password = e.target.value;

        let passwordError = null;
        if(password.length == 0)
            passwordError = 'Master password must be not empty';
        else if(isWeakPassword(password))
            passwordError = 'Master password too weak';

        this.setState({password, passwordError});
    }

    onSave() {
        const { password, passwordError} = this.state;
        if(passwordError == null){
            this.props.updateMasterPassword(password);
            this.props.hideDialog();
        }
    }
    
    render() {
        const { open, hideDialog } = this.props;
        const { password, passwordError} = this.state;

        const actions = [
            <FlatButton key={0} onTouchTap={hideDialog} label="Cancel" primary />,
            <FlatButton key={1} onTouchTap={this.onSave.bind(this)} label="Save" primary />,
        ];

        return (
            <Dialog open={open} title="Change Password" actions={actions} onRequestClose={hideDialog}>
                <TextField 
                        floatingLabelText="Enter master password" 
                        autoComplete="new-password" 
                        errorText={passwordError}
                        fullWidth 
                        type="password"
                        value={password} 
                        onChange={this.onPasswordChange.bind(this)} />
            </Dialog>
        );
    }
}

export default ChangePasswordDialog;