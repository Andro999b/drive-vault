import copyToClipboad from 'copy-to-clipboard';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ListItem } from 'material-ui/List';
import ActionVisibilityIcon from 'material-ui/svg-icons/action/visibility';
import ActionVisibilityOffIcon from 'material-ui/svg-icons/action/visibility-off';

import { grey600 } from 'material-ui/styles/colors';

import { showToast } from 'actions/toast';

@connect(
    null,
    (dispatch) => ({
        showToast: (msg) => dispatch(showToast(msg))
    })
)
class Credential extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        showToast: PropTypes.func.isRequired,
        rightIconButton: PropTypes.element,
        nestedLevel: PropTypes.number
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
        copyToClipboad(this.props.value);
        this.props.showToast('Value copied to clipboar');
    }
    
    render() {
        const { showValue } = this.state;
        const { name, value, rightIconButton, nestedLevel } = this.props;

        const leftIcon = (
            <span 
                onMouseDown={this.showValue}
                onTouchStart={this.showValue}
                onMouseUp={this.hideValue}
                onMouseLeave={this.hideValue}
                onTouchEnd={this.hideValue}
                onTouchTap={(e) => e.stopPropagation()}>
                {showValue? <ActionVisibilityOffIcon color={grey600}/> : <ActionVisibilityIcon color={grey600}/>}
            </span>
        );

        return (
            <ListItem
                nestedLevel={nestedLevel}
                leftIcon={leftIcon}
                primaryText={name}
                secondaryText={showValue? value : '*'.repeat(Math.max(value.length, 10))}
                onTouchTap={this.doCopyToClipboad}
                rightIconButton={rightIconButton} />
        );
    }
}

export default Credential;