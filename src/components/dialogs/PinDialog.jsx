import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Dialog from './Dialog';
import PinInput from 'components/PinInput';
import FlatButton from 'material-ui/FlatButton';

import { hidePinDialog } from 'actions/dialogs';
import { setPinCode } from 'actions/sagas';

@connect(
    (state) => ({
        open: state.dialogs.setPin
    }),
    (dispatch) => ({
        hideDialog: () => dispatch(hidePinDialog()),
        setPinCode: (val) => dispatch(setPinCode(val))
    })
)
class PinDialog extends Component {
    static propTypes = {
        open: PropTypes.bool,
        hideDialog: PropTypes.func.isRequired,
        setPinCode: PropTypes.func.isRequired,
    };

    constructor(props, context) {
        super(props, context);
        
        this.state = {
            pinCode: '' 
        };
    }
    
    onPinCodeChanged(pinCode) {
        this.setState({pinCode});
    }

    render() {
        const { open, hideDialog, setPinCode } = this.props;
        const { pinCode } = this.state;

        const actions = [
            <FlatButton key={0} onClick={hideDialog} label="Cancel" primary />,
            <FlatButton key={1} onClick={() => setPinCode(pinCode)} label="Save" primary disabled={pinCode.length != PinInput.PIN_LENGTH}/>,
        ];

        return (
            <Dialog open={open} onRequestClose={hideDialog} actions={actions}>
                <div>
                    You can set short numeric code to encrypt your password. 
                    Next time when you open vault application will ask you this code instead of password.
                    This code can be used only on this device.
                </div>
                <PinInput onBack={hideDialog} onChange={this.onPinCodeChanged.bind(this)}/>
            </Dialog>
        );
    }
}

export default PinDialog;