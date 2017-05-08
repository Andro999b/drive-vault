import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IconButton from 'material-ui/IconButton';
import ActionDeleteIcon from 'material-ui/svg-icons/action/delete';
import { ListItem } from 'material-ui/List';

class Group extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired
    };

    render() {
        const {name} = this.props;
        return (
            <ListItem
                primaryText={name}
                rightIconButton={
                    <IconButton>
                        <ActionDeleteIcon />
                    </IconButton>
                }
            />
        );
    }
}

export default Group;