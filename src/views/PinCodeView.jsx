import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { decryptVaultByPinCode } from 'actions/sagas';
import { setPinCodeError } from 'actions';

import RaisedButton from 'material-ui/RaisedButton';

import PinInput from 'components/PinInput';

@connect(
    (state) => ({
        error: state.decrypt.pinCodeError
    }),
    (dispatch) => ({
        decryptVault: (pinCode) => dispatch(decryptVaultByPinCode(pinCode)),
        clearPinError: () => dispatch(setPinCodeError())
    })
)
class PinCodeView extends Component {
    static propTypes = {
        error: PropTypes.string,
        clearPinError: PropTypes.func.isRequired,
        decryptVault: PropTypes.func.isRequired,
    }

    constructor(props, context) {
        super(props, context);
        
        this.state = {
            pinCode: '' 
        };
    }

    onPinCodeChanged(pinCode) {
        this.props.clearPinError();
        this.setState({pinCode});
    }

    render() {
        const { decryptVault, error } = this.props;
        const { pinCode } = this.state;

        return (
            <div>
                <PinInput onChange={this.onPinCodeChanged.bind(this)} error={error}/>
                <RaisedButton label='Open vault' 
                    primary fullWidth 
                    onClick={() => decryptVault(pinCode)} 
                    disabled={pinCode.length != PinInput.PIN_LENGTH}/>
            </div>
        );
    }
}

export default PinCodeView;