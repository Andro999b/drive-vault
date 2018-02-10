import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MasterPasswordView from './MasterPasswordView';
import PinCodeView from './PinCodeView';

import { clearDecryptErrors } from 'actions';
import { isTablet } from 'service/utils';

import { Link } from 'react-router-dom';
import BackNav from 'components/BackNav';

import IconButton from 'material-ui/IconButton';
import PinIcon from 'material-ui/svg-icons/communication/dialpad';
import PasswordIcon from 'material-ui/svg-icons/communication/vpn-key';

@connect(
    (state) => ({
        pinCodeAvaliable: state.decrypt.pinCodeAvaliable && isTablet()
    }),
    (dispatch) => ({
        clearErrors: () => dispatch(clearDecryptErrors())
    })
)
class DecryptView extends Component {
    static propTypes = {
        pinCodeAvaliable: PropTypes.bool,
        clearErrors: PropTypes.func.isRequired
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            usePinCode: props.pinCodeAvaliable
        };
    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps.pinCodeAvaliable)
            this.setState({ usePinCode: false });
    }

    switchInput() {
        this.props.clearErrors();
        this.setState((prevState) => ({
            usePinCode: !prevState.usePinCode
        }));
    }

    render() {
        const { pinCodeAvaliable } = this.props;
        const { usePinCode } = this.state;

        return (
            <div className="decrypt-view">
                <div className="decrypt-view__header">
                    <Link to="/">
                        <BackNav label="Back to vaults" />
                    </Link>
                    {/*decript method switcher*/}
                    {pinCodeAvaliable &&
                        <IconButton 
                            style={{height: 34, position: 'absolute', top: 0, right: 0, padding: 0}}
                            onClick={this.switchInput.bind(this)}>
                            {!usePinCode && <PinIcon />}
                            {usePinCode && <PasswordIcon />}
                        </IconButton>
                    }
                </div>
                {usePinCode && <PinCodeView />}
                {!usePinCode && <MasterPasswordView />}
            </div>
        );
    }
}

export default DecryptView;