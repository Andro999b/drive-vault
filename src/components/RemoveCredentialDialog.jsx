import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { hideRemoveCredentialDialog } from '../actions/dialogs';

@connect(
    (state) => ({
        credential: state.removeCredential
    }),
    (dispatch) => ({
        hideDialog: () => dispatch(hideRemoveCredentialDialog())
    })
)
class RemoveCredentialDialog extends Component {
    static propTypes = {
        credential: PropTypes.object,
        hideDialog: PropTypes.func.isRequired,
    };

    render() {
        const { credential, hideDialog } = this.props;
        const name = credential? credential.name : null;

        const actions = [
            <FlatButton key={0} onTouchTap={hideDialog} label="Cancel" primary />,
            <FlatButton key={1} label="Remove" primary />,
        ];

        return (
            <Dialog
                 open={credential != null} 
                 actions={actions}
                 onRequestClose={hideDialog}
                 >
                Remove credential {name} ? 
            </Dialog>
        );
    }
}

export default RemoveCredentialDialog;