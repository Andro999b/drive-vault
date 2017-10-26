import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dialog from './Dialog';
import FlatButton from 'material-ui/FlatButton';

import { hideRemoveCredentialDialog } from '../actions/dialogs';
import { removeCredential } from '../actions/sagas';

@connect(
    (state) => ({
        credential: state.dialogs.removeCredential
    }),
    (dispatch) => ({
        hideDialog: () => dispatch(hideRemoveCredentialDialog()),
        removeCredential: (credential) => dispatch(removeCredential(credential))
    })
)
class RemoveCredentialDialog extends Component {
    static propTypes = {
        credential: PropTypes.object,
        hideDialog: PropTypes.func.isRequired,
        removeCredential: PropTypes.func.isRequired,
    };

    render() {
        const { credential, hideDialog, removeCredential } = this.props;
        const name = credential ? credential.name : null;

        const actions = [
            <FlatButton key={0} onTouchTap={hideDialog} label="Cancel" primary />,
            <FlatButton key={1} onTouchTap={() => removeCredential(credential)} label="Remove" primary />,
        ];

        return (
            <Dialog
                offMobileMode
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