import React, { Component } from 'react';

import IconButton from 'material-ui/IconButton';
import ActionDeleteIcon from 'material-ui/svg-icons/action/delete';
import { ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

class GroupsList extends Component {
    render() {
        return (
            <div>
                <div>
                    <ListItem
                        primaryText="All groups"
                        rightIconButton={
                            <IconButton>
                                <ActionDeleteIcon />
                            </IconButton>
                        }
                    />
                </div>
                <FlatButton
                    label="New group"
                    fullWidth
                    style={{
                        position: 'absolute',
                        bottom: 0
                    }} />
            </div>
        );
    }
}

export default GroupsList;