import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setMasterPassword } from 'actions/sagas';
import { setMasterPasswordError } from 'actions';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';

import { callOnEnter } from 'service/utils';

import { grey800 as backLinkColor } from 'material-ui/styles/colors';

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

    componentWillReceiveProps(nextProps) {
        if(nextProps.masterPasswordError) {
            this.setState({password: ''});
        }
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
                <div className="back-to-files-link">
                    <Link to="/">
                        <BackIcon color={backLinkColor}/> 
                        <span style={{color: backLinkColor}}>Back to vaults</span>
                    </Link>
                </div>
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
                <br />
                <RaisedButton label="Ok" primary fullWidth onClick={() => this.decryptFile()} />
            </div>
        );
    }
}

export default DecryptView;