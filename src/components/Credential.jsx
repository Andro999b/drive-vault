import copyToClipboad from 'copy-to-clipboard';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ActionVisibilityIcon from 'material-ui/svg-icons/action/visibility';
import ActionVisibilityOffIcon from 'material-ui/svg-icons/action/visibility-off';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import { grey500 } from 'material-ui/styles/colors';

import { showToast } from '../actions/toast';
import { showSaveCredentialDialog, showRemoveCredentialDialog } from '../actions/dialogs';

@connect(
    null,
    (dispatch) => ({
        showToast: (msg) => dispatch(showToast(msg)),
        showEditDialog: (credential) => dispatch(showSaveCredentialDialog(credential)),
        showRemoveDialog: (credential) => dispatch(showRemoveCredentialDialog(credential))
    })
)
class Credential extends Component {
    static propTypes = {
        credential: PropTypes.object.isRequired,
        showToast: PropTypes.func.isRequired,
        showEditDialog: PropTypes.func.isRequired,
        showRemoveDialog: PropTypes.func.isRequired
    }

    constructor(props, context) {
        super(props, context);
        
        this.state = {
            showValue: false
        };
    }

    showValue = () => this.setState({showValue: true})
    hideValue = () => this.setState({showValue: false})
    doCopyToClipboad = () => {
        copyToClipboad(this.props.credential.value);
        this.props.showToast('Value copied to clipboar');
    }
    
    render() {
        const { showValue } = this.state;
        const { credential, showEditDialog, showRemoveDialog } = this.props;
        const { name, value } = credential;

        const leftIcon = (
            <span 
                onMouseDown={this.showValue}
                onTouchStart={this.showValue}
                onMouseUp={this.hideValue}
                onMouseLeave={this.hideValue}
                onTouchEnd={this.hideValue}
                onTouchTap={(e) => e.stopPropagation()}>
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
                <MenuItem onTouchTap={() => showEditDialog(credential)}>Edit</MenuItem>
                <MenuItem onTouchTap={() => showRemoveDialog(credential)}>Remove</MenuItem>
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