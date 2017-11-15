import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setMasterPassword } from 'actions/sagas';
import { setMasterPasswordError } from 'actions';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { callOnEnter } from 'service/utils';

@connect(
    (state) => ({
        masterPasswordError: state.decrypt.masterPasswordError
    }),
    (dispatch) => ({
        setMasterPassword: (password) => dispatch(setMasterPassword(password)),
        clearPasswordError: () => dispatch(setMasterPasswordError(null))
    })
)
class DecryptView extends Component {
    static propTypes = {
        masterPasswordError: PropTypes.string,
        setMasterPassword: PropTypes.func.isRequired,
        clearPasswordError: PropTypes.func.isRequired
    }

    constructor(props, context) {
        super(props, context);
        this.state = { password: '' };
    }

    componentWillMount() {
        this.props.clearPasswordError();
    }

    decryptFile() {
        this.props.setMasterPassword(this.state.password);
    }

    onChange(e) {
        this.setState({ password: e.target.value });
    }

    render() {
        const { password } = this.state;
        const { masterPasswordError } = this.props;

        return (
            <div className="initial-view">
                <TextField
                    autoFocus
                    fullWidth
                    value={password}
                    onKeyDown={callOnEnter(this.decryptFile.bind(this))}
                    onChange={(e) => this.onChange(e)}
                    hintText="Enter master password"
                    floatingLabelText="Enter master password"
                    errorText={masterPasswordError}
                    type="password" />
                <br />
                <RaisedButton label="Ok" primary fullWidth onClick={() => this.decryptFile()} />
            </div>
        );
    }
}

export default DecryptView;