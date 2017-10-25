import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createNewFile } from '../actions/sagas';
import { showRemoveFileDialog } from '../actions/dialogs';

import RemoveFileDialog from '../components/RemoveFileDialog';
import Loader from '../components/Loader';

import Avatar from 'material-ui/Avatar';
import FileIcon from 'material-ui/svg-icons/action/https';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

import { red700, grey500 } from 'material-ui/styles/colors';

@connect(
    (state) => ({
        dbInited: state.decrypt.db,
        fileListLoading: state.files.fileListLoading,
        newFileNameError: state.files.newFileNameError,
        fileList: state.files.list
    }),
    (dispatch) => ({
        createNewFile: (name) => dispatch(createNewFile(name)),
        showRemoveFileDialog: (file) => dispatch(showRemoveFileDialog(file))
    })
)
class FileSelectView extends Component {
    static propTypes = {
        dbInited: PropTypes.bool,
        fileList: PropTypes.array.isRequired,
        newFileNameError: PropTypes.string,
        createNewFile: PropTypes.func.isRequired,
        showRemoveFileDialog: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        fileListLoading: PropTypes.bool,
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            fileName: ''
        };
    }

    componentWillMount() {
        const { dbInited, history } = this.props;
        if (dbInited) history.push('/list');
    }

    decriptFile(file) {
        const { history } = this.props;
        history.push('/file/' + file.id);
    }

    createNewFile() {
        const { createNewFile } = this.props;
        const { fileName } = this.state;

        createNewFile(fileName);
    }

    onKeyDown(e) {
        if (e.keyCode == 13) {
            this.createNewFile();
        }
    }

    onNameChange(e) {
        this.setState({
            fileName: e.target.value
        });
    }

    render() {
        const { fileName } = this.state;
        const { fileList, newFileNameError, showRemoveFileDialog, fileListLoading } = this.props;
        const subHeadStyle = { paddingLeft: 0, textAlign: 'center' };
        return (
            <div>
                {fileListLoading && <Loader />}
                {!fileListLoading &&
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
                }
            </div>
        );
    }

    renderNewFileImput(fileName, newFileNameError) { //can be moved to components
        return (
            <div>
                <TextField
                    onKeyDown={(e) => this.onKeyDown(e)}
                    onChange={(e) => this.onNameChange(e)}
                    fullWidth
                    value={fileName}
                    errorText={newFileNameError}
                    hintText="Enter vault name"
                    floatingLabelText="Enter vault name" />
                <RaisedButton
                    label="Create new"
                    primary fullWidth
                    onTouchTap={() => this.createNewFile()} />
            </div>
        );
    }

    renderItem(file, showRemoveFileDialog) { //can be moved to components
        return (
            <ListItem
                onTouchTap={() => this.decriptFile(file)}
                key={file.id}
                leftAvatar={<Avatar icon={<FileIcon />} backgroundColor={grey500} />}
                rightIconButton={
                    <IconButton onTouchTap={() => showRemoveFileDialog(file)}>
                        <DeleteIcon color={red700} />
                    </IconButton>
                }
                primaryText={file.name} />
        );
    }
}

export default FileSelectView;