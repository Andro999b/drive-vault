import React, { Component } from 'react';

import MasterPasswordView from './MasterPasswordView';
import PinCodeView from './PinCodeView';

class DecryptView extends Component {
    constructor(props, context) {
        super(props, context); 

        this.state = {
            usePinCode: this.isPinCodeAvaliable()
        };
    }

    render() {
        const { usePinCode } = this.state;

        return (
            <div>
                {usePinCode && <PinCodeView/>}
                {!usePinCode && <MasterPasswordView/>}
            </div>
        );
    }

    isPinCodeAvaliable() {
        return true;
    }
}

export default DecryptView;