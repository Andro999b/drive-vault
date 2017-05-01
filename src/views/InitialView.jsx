import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { setMasterPasswordAndShowList } from '../actions/setMasterPassword';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

@connect(
    (state) => ({
        authResult: state.authResult,
        masterPasswordError: state.masterPasswordError
    }),
    (dispatch) => ({
        setMasterPassword: (password) => dispatch(setMasterPasswordAndShowList(password))
    }) 
)
class InitialView extends Component {
    static propTypes = {
        authResult: PropTypes.bool.isRequired,
        masterPasswordError: PropTypes.string,
        setMasterPassword: PropTypes.func.isRequired
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            password: ''
        };
    }

    onKeyDown(e) {
        if (e.keyCode == 13) {
            if (this.state.password) {
                this.props.setMasterPassword(this.state.password);
            }
        }
    }

    onSubmit() {
        this.props.setMasterPassword(this.state.password);
    }

    onChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    render() {
        const { password } = this.state;
        const { authResult, masterPasswordError } = this.props;
        return (
            <div className="initial-view">
                {!authResult && <span className="initial-view__fail">Aplication start fail</span>}
                {authResult &&
                    <div>
                        <TextField
                            fullWidth
                            value={password}
                            onKeyDown={this.onKeyDown.bind(this)}
                            onChange={this.onChange.bind(this)}
                            hintText="Enter master password"
                            floatingLabelText="Enter master password"
                            errorText={masterPasswordError}
                            type="password" />
                        <br />
                        <RaisedButton label="Ok" primary fullWidth onClick={this.onSubmit.bind(this)} />
                    </div>
                }

            </div>
        );
    }
}

export default InitialView;