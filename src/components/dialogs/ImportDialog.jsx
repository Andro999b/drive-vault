import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dialog from './Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { hideImportDialog } from 'actions/dialogs';
import { importVault } from 'actions/sagas';

import { callOnEnter } from 'service/utils';

@connect(
    (state) => {
        const importDilaog = state.dialogs.import;

        return {
            error: importDilaog && importDilaog.error,
            open: importDilaog != null
        };
    },
    (dispatch) => ({
        hideDialog: () => dispatch(hideImportDialog()),
        importVault: (password, file) => dispatch(importVault(password, file))
    })
)
class ImporttDialog extends Component {
    static propTypes = {
        error: PropTypes.string,
        open: PropTypes.bool,
        hideDialog: PropTypes.func.isRequired,
        importVault: PropTypes.func.isRequired,
    };
    
    state ={
        fileName: '',
        selectedFile: null,
        password: ''
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.open) {
            this.setState({
                fileName: '',
                selectedFile: null,
                password: ''
            });
        }
    }

    onFileChang(e) {
        const { files } = e.target;
        if(files && files.length == 1) {
            const file = files[0];
            this.setState({ 
                fileName: file.name, 
                selectedFile: file 
            });
        }
    }

    onPasswordChange(e) {
        const password = e.target.value;
        this.setState({ password });
    }

    onImport() {
        const { importVault } = this.props;
        const { password, selectedFile } = this.state;

        importVault(password, selectedFile);
    }

    render() {
        const { open, hideDialog, error } = this.props;
        const { fileName, selectedFile, password } = this.state;

        const actions = [
            <FlatButton key={0} onTouchTap={() => hideDialog()} label="Cancel" primary />,
            <FlatButton key={1} onTouchTap={this.onImport.bind(this)} label="Import" primary disabled={!selectedFile}/>,
        ];

        return (
            <Dialog open={open} title="Import vault" actions={actions}>
                <p>You are import encrypted vault snapshot from your local filesystem. Please select file and enter password to decrypt it.</p>
                <p><b>Important: all you current vault credentials will be overrided!</b></p>
                <div className="file-import">
                    <span className="file-import__file-name">{ fileName || 'Please select file' }</span>
                    <span className="file-import__button-wrapper">
                        <FlatButton label="Select File">
                            <input className="file-import__input" onChange={this.onFileChang.bind(this)} type="file"/>
                        </FlatButton>
                    </span>
                </div>
                <TextField
                    autoFocus
                    onKeyDown={callOnEnter(this.onImport.bind(this))}
                    value={password}
                    onChange={this.onPasswordChange.bind(this)}
                    type="password"
                    floatingLabelText="Enter pasword"
                    autoComplete="new-password"
                    errorText={error}
                    fullWidth />
            </Dialog>
        );
    }
}

export default ImporttDialog;