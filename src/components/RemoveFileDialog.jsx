import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Dialog from './Dialog';
import FlatButton from 'material-ui/FlatButton';

import { hideRemoveFileDialog } from '../actions/dialogs';
import { removeFile } from '../actions/sagas';

@connect(
    (state) => ({
        file: state.dialogs.removeFile
    }),
    (dispatch) => ({
        hideDialog: () => dispatch(hideRemoveFileDialog()),
        removeFile: (file) => dispatch(removeFile(file))
    })
)
class RemoveFileDialog extends Component {
    static propTypes = {
        file: PropTypes.object,
        hideDialog: PropTypes.func.isRequired,
        removeFile: PropTypes.func.isRequired,
    };

    render() {
        const { file, hideDialog, removeFile } = this.props;
        const name = file != null ? file.name : null;

        const actions = [
            <FlatButton key={0} onTouchTap={hideDialog} label="Cancel" primary />,
            <FlatButton key={1} onTouchTap={() => removeFile(file)} label="Remove" primary />,
        ];

        return (
            <Dialog offMobileMode open={file != null} actions={actions} onRequestClose={hideDialog}>
                Remove file {name} ? 
            </Dialog>
        );
    }
}

export default RemoveFileDialog;