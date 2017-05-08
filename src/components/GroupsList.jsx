import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import Group from './Group';
import RemoveGroup from './RemoveGroup';

class GroupsList extends Component {
    render() {
        return (
            <div>
                <div>
                    <ListItem primaryText="All credentials"/>
                    <Group name="Test group"/>
                </div>
                <FlatButton
                    label="New group"
                    fullWidth
                    style={{
                        position: 'absolute',
                        bottom: 0
                    }} />
                <RemoveGroup/>
            </div>
        );
    }
}

export default GroupsList;