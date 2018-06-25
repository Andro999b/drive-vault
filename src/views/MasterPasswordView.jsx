import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { decryptVault } from 'actions/sagas';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { callOnEnter } from 'service/utils';

@connect(
    (state) => ({
        masterPasswordError: state.decrypt.masterPasswordError
    }),
    (dispatch) => ({
        decryptVault: (password) => dispatch(decryptVault(password))
    })
)
class MasterPasswordView extends Component {
    static propTypes = {
        newVault: PropTypes.bool,
        masterPasswordError: PropTypes.string,
        decryptVault: PropTypes.func.isRequired
    }

    constructor(props, context) {
        super(props, context);
        this.state = { password: '' };
    }

    decryptFile() {
        this.props.decryptVault(this.state.password);
        this.setState({password: ''});
    }

    onChange(e) {
        this.setState({ password: e.target.value });
    }

    render() {
        const { password } = this.state;
        const { masterPasswordError, newVault } = this.props;

        return (
            <div>
                <TextField
                    autoFocus
                    fullWidth
                    value={password}
                    onKeyDown={callOnEnter(this.decryptFile.bind(this))}
                    onChange={(e) => this.onChange(e)}
                    floatingLabelText="Enter master password"
                    floatingLabelFixed
                    errorText={masterPasswordError}
                    autoComplete="none"
                    type="password" />
                <div className='password-hint' style={{ display: newVault ? 'block': 'none'}}>
                    Password must cointain one letter in uppercase and lowercase, one number and one special symbol. Minimal length 8 characters.
                </div>
                <RaisedButton label={newVault ? 'Create vault' : 'Open vault'} primary fullWidth onClick={() => this.decryptFile()} />
            </div>
        );
    }
}

export default MasterPasswordView;