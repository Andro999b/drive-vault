import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ActionVisibilityIcon from 'material-ui/svg-icons/action/visibility';
import ActionVisibilityOffIcon from 'material-ui/svg-icons/action/visibility-off';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

class Credential extends Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            showValue: false
        };
    }

    showValue = () => this.setState({showValue: true})
    hideValue = () => this.setState({showValue: false})
    
    render() {
        const {showValue} = this.state;
        const leftIcon = (
            <span onMouseDown={this.showValue} onMouseUp={this.hideValue}>
                {showValue? <ActionVisibilityOffIcon/> : <ActionVisibilityIcon/>}
            </span>
        );

        const rightIconMenu = (
            <IconMenu iconButtonElement={
                <IconButton
                    touch
                    tooltip="more"
                    tooltipPosition="bottom-left"
                >
                    <MoreVertIcon />
                </IconButton>}>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Remove</MenuItem>
                <MenuItem>Copy to clipboard</MenuItem>
            </IconMenu>
        );

        return (
            <ListItem
                leftIcon={leftIcon}
                primaryText="test"
                rightIconButton={rightIconMenu} />
        );
    }
}

Credential.propTypes = {

};

export default Credential;