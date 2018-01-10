import React, { Component } from 'react';
import { connect } from 'react-redux';

import PinInput from 'components/PinInput';

@connect(
    (state) => ({})
)
class PinCodeView extends Component {
    render() {
        return (
            <PinInput {...this.props}/>
        );
    }
}

export default PinCodeView;