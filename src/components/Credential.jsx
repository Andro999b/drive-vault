import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CrediCardIcon from 'material-ui/svg-icons/action/credit-card';
import MultipleValuesIcon from 'material-ui/svg-icons/action/description';

import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ListItem from 'material-ui/List/ListItem';

import CredentialValue from './CredentialValue';

import { TYPE_CREDIT_CARD } from '../service/credentials';
import { showSaveCredentialDialog, showRemoveCredentialDialog } from '../actions/dialogs';

@connect(
    null,
    (dispatch) => ({
        showEditDialog: (credential) => dispatch(showSaveCredentialDialog(credential)),
        showRemoveDialog: (credential) => dispatch(showRemoveCredentialDialog(credential))
    })
)
class Credential extends Component {
    static propTypes = {
        credential: PropTypes.object.isRequired,
        showEditDialog: PropTypes.func.isRequired,
        showRemoveDialog: PropTypes.func.isRequired
    };

    getIcon(type) {
        switch(type) {
            case TYPE_CREDIT_CARD: return (<CrediCardIcon/>);
            default: return (<MultipleValuesIcon/>);
        }
    }

    render() {
        const { showEditDialog, showRemoveDialog, credential } = this.props;
        const { values } = credential;

        const rightIconButton = (
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
            </IconMenu>
        );

        return values.length > 1 ?
            this.renderMultipeValue(credential, rightIconButton) :
            this.renderSinleValue(credential, rightIconButton);
    }

    renderMultipeValue(credential, rightIconButton) {
        const { name, values, type } = credential;

        return (
            <ListItem
                leftIcon={this.getIcon(type)}
                primaryText={name}
                rightIconButton={rightIconButton}
                primaryTogglesNestedList
                nestedItems={values.map(({name, value}, index) => 
                    (<CredentialValue key={index} name={name} value={value}/>)
                )}
            />
        );
    }

    renderSinleValue(credential, rightIconButton) {
        const { name, values } = credential;

        return (
            <CredentialValue name={name} value={values[0].value} rightIconButton={rightIconButton} />
        );
    }
}

export default Credential;