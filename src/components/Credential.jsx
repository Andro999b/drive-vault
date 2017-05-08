import copyToClipboad from 'copy-to-clipboard';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ActionVisibilityIcon from 'material-ui/svg-icons/action/visibility';
import ActionVisibilityOffIcon from 'material-ui/svg-icons/action/visibility-off';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import { grey500 } from 'material-ui/styles/colors';

class Credential extends Component {
    static propTypes = {
        credential: PropTypes.object.isRequired,
    }

    constructor(props, context) {
        super(props, context);
        
        this.state = {
            showValue: false
        };
    }

    showValue = () => this.setState({showValue: true})
    hideValue = () => this.setState({showValue: false})
    doCopyToClipboad = () => copyToClipboad(this.props.credential.value)
    
    render() {
        const {showValue} = this.state;
        const {name, value} = this.props.credential;

        const leftIcon = (
            <span onMouseDown={this.showValue} onMouseUp={this.hideValue} onTouchTap={(e) => e.stopPropagation()}>
                {showValue? <ActionVisibilityOffIcon color={grey500}/> : <ActionVisibilityIcon color={grey500}/>}
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
                <MenuItem onTouchTap={this.doCopyToClipboad}>Copy to clipboard</MenuItem>
            </IconMenu>
        );

        return (
            <ListItem
                leftIcon={leftIcon}
                primaryText={name}
                secondaryText={showValue? value : '*'.repeat(Math.max(value.length, 10))}
                onTouchTap={this.doCopyToClipboad}
                rightIconButton={rightIconMenu} />
        );
    }
}

export default Credential;