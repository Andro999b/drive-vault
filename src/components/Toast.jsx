import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Snackbar from 'material-ui/Snackbar';
import { hideToast } from '../actions/toast';

@connect(
    (state) => ({
        toastMsg: state.toastMsg
    }),
    (dispatch) => ({
        hideToast: () => dispatch(hideToast())
    })
)
class Toast extends Component {
    static propTypes = {
        hideToast: PropTypes.func.isRequired,
        toastMsg: PropTypes.string
    };

    hideToast(reason) {
        if(reason == 'timeout')
            this.props.hideToast();
    }

    render() {
        const {toastMsg} = this.props;

        return (
            <Snackbar 
                open={toastMsg != null}
                message={toastMsg || ''} 
                autoHideDuration={2000}
                onRequestClose={this.hideToast.bind(this)}
            />
        );
    }
}

export default Toast;