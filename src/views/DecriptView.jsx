import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setMasterPassword } from '../actions/sagas';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

@connect(
    (state) => ({
        masterPasswordError: state.masterPasswordError
    }),
    (dispatch) => ({
        setMasterPassword: (password) => dispatch(setMasterPassword(password))
    }) 
)
class DecriptView extends Component {
    static propTypes = {
        fileId: PropTypes.string,
        masterPasswordError: PropTypes.string,
        setMasterPassword: PropTypes.func.isRequired
    }

    componentWillMount() {

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
        const { masterPasswordError } = this.props;
        return (
            <div className="initial-view">
                    <div>
                        <TextField
                            autoFocus
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
            </div>
        );
    }
}

export default DecriptView;