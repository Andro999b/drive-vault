import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setNewFileName } from '../actions';

import { validateFileName } from '../service/fs'; 

import Avatar from 'material-ui/Avatar';
import FileIcon from 'material-ui/svg-icons/action/https';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

import { lightBlue500, red700 } from 'material-ui/styles/colors';

@connect(
    (state) => ({
        dbInited: state.decrypt.db,
        fileName: state.decrypt.fileName,
        fileList: state.files.list
    }),
    (dispatch) => ({
        setNewFileName: (name) => dispatch(setNewFileName(name))
    })
)
class FileSelectView extends Component {
    static propTypes = {
        dbInited: PropTypes.bool,
        fileList: PropTypes.array.isRequired,
        setNewFileName: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired
    }
    
    constructor(props, context) {
        super(props, context);
        this.state = {
            fileNameError: '',
            fileName: ''
        };
    }
    
    componentWillMount() {
        const { dbInited, history } = this.props;
        if(dbInited) history.push('/list');
    }

    decriptFile(file) {
        const { history } = this.props;
        history.push('/file/' + file.id);
    }

    createNewFile() {
        const { history, setNewFileName } = this.props;
        const { fileName } = this.state;

        if(validateFileName(fileName)) {
            setNewFileName(fileName);
            history.push('/file/new');
        } else {
            this.setState({
                fileNameError: 'Bad file name',
            });
        }
    }

    onNameChange(e) {
        this.setState({
            fileNameError: '',
            fileName: e.target.value 
        });
    }

    render() {
        const { fileName, fileNameError } = this.state;
        const { fileList } = this.props;
        const subHeadStyle = {paddingLeft: 0, textAlign:'center'};
        return (
            <div className="files-list">
                <List>
                    {fileList.length > 0 && 
                    <div>
                        <Subheader style={subHeadStyle}>Select vault</Subheader>
                        {fileList.map((file) =>
                            (<ListItem
                                onTouchTap={() => this.decriptFile(file)}
                                key={file.id}
                                leftAvatar={<Avatar icon={<FileIcon />} backgroundColor={lightBlue500} />}
                                rightIconButton={
                                    <IconButton>
                                        <DeleteIcon color={red700} />
                                    </IconButton>
                                    }
                                primaryText={file.name} />)
                        )}
                        <Subheader style={subHeadStyle}>Or</Subheader>
                    </div>
                    }
                    <div>
                        <TextField
                            onChange={(e) => this.onNameChange(e)}
                            fullWidth
                            value={fileName}
                            errorText={fileNameError}
                            hintText="Enter vault name"
                            floatingLabelText="Enter vault name" />
                        <RaisedButton 
                            label="Create new" 
                            primary fullWidth 
                            onTouchTap={() => this.createNewFile()}/>
                    </div>
                </List >
            </div>
        );
    }
}

export default FileSelectView;