import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
        fileName: state.decrypt.fileName,
        fileList: state.files.list
    })
)
class FileSelectView extends Component {
    static propTypes = {
        fileList: PropTypes.array.isRequired,
    }

    render() {
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
                            fullWidth
                            hintText="Enter vault name"
                            floatingLabelText="Enter vault name" />
                        <RaisedButton label="Create new" primary fullWidth />
                    </div>
                </List >
            </div>
        );
    }
}

export default FileSelectView;