import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Dialog from './Dialog';
import PinInput from 'components/PinInput';

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

    render() {
        const { open, hideDialog, setPinCode } = this.props;

        return (
            <Dialog open={open} onRequestClose={hideDialog}>
                <div>
                    You can set short numeric code to encrypt your password. 
                    Next time when you open vault application will ask you this code instead of password.
                    This code can be used only on this device.
                </div>
                <PinInput onBack={hideDialog} onSubmit={(val) => setPinCode(val)}/>
            </Dialog>
        );
    }
}

export default PinDialog;