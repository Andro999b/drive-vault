import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createNewFile, downloadFile } from 'actions/sagas';
import { showRemoveFileDialog } from 'actions/dialogs';

import RemoveFileDialog from 'components/dialogs/RemoveFileDialog';
import Loader from 'components/Loader';

import Avatar from 'material-ui/Avatar';
import FileIcon from 'material-ui/svg-icons/action/https';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

import { red700, grey500 } from 'material-ui/styles/colors';

import { callOnEnter } from 'service/utils';

@connect(
    (state) => ({
        fileListLoading: state.files.fileListLoading,
        newFileNameError: state.files.newFileNameError,
        fileList: state.files.list
    }),
    (dispatch) => ({
        createNewFile: (name) => dispatch(createNewFile(name)),
        downloadFile: (fileId) => dispatch(downloadFile(fileId)),
        showRemoveFileDialog: (file) => dispatch(showRemoveFileDialog(file))
    })
)
class FileSelectView extends Component {
    static propTypes = {
        fileList: PropTypes.array.isRequired,
        newFileNameError: PropTypes.string,
        createNewFile: PropTypes.func.isRequired,
        downloadFile: PropTypes.func.isRequired,
        showRemoveFileDialog: PropTypes.func.isRequired,
        fileListLoading: PropTypes.bool,
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            fileName: ''
        };
    }

    downloadFile(file) {
        this.props.downloadFile(file.id);
    }

    createNewFile() {
        const { createNewFile } = this.props;
        const { fileName } = this.state;

        createNewFile(fileName);
    }

    onNameChange(e) {
        this.setState({
            fileName: e.target.value
        });
    }

    render() {
        const { fileListLoading } = this.props;
        
        return (
            <div>
                {fileListLoading && <Loader />}
                {!fileListLoading && this.renderContent()}
            </div>
        );
    }

    renderContent() {
        const { fileName } = this.state;
        const { fileList, newFileNameError, showRemoveFileDialog } = this.props;

        const subHeadStyle = { paddingLeft: 0, textAlign: 'center' };

        return (
            <div className="files-list">
                <List>
                    {fileList.length > 0 &&
                        <div>
                            <Subheader style={subHeadStyle}>Select vault</Subheader>
                            {fileList.map((file) => this.renderItem(file, showRemoveFileDialog))}
                            <Subheader style={subHeadStyle}>Or</Subheader>
                        </div>
                    }
                    {this.renderNewFileImput(fileName, newFileNameError)}
                </List >
                <RemoveFileDialog />
            </div>
        );
    }

    renderNewFileImput(fileName, newFileNameError) { //can be moved to components
        return (
            <div>
                <TextField
                    onKeyDown={callOnEnter(this.createNewFile.bind(this))}
                    onChange={(e) => this.onNameChange(e)}
                    fullWidth
                    value={fileName}
                    errorText={newFileNameError}
                    hintText="Enter new vault name" />
                <RaisedButton
                    label="Create new"
                    primary fullWidth
                    onClick={() => this.createNewFile()} />
            </div>
        );
    }

    renderItem(file, showRemoveFileDialog) { //can be moved to components
        return (
            <ListItem
                onClick={() => this.downloadFile(file)}
                key={file.id}
                leftAvatar={<Avatar icon={<FileIcon />} backgroundColor={grey500} />}
                rightIconButton={
                    <IconButton onClick={() => showRemoveFileDialog(file)}>
                        <DeleteIcon color={red700} />
                    </IconButton>
                }
                primaryText={file.name} />
        );
    }
}

export default FileSelectView;