import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CreditCardIcon from 'material-ui/svg-icons/action/credit-card';
import SiteIcon from 'material-ui/svg-icons/action/language';
import LoginPasswordIcon from 'material-ui/svg-icons/action/account-box';
import MultipleValuesIcon from 'material-ui/svg-icons/action/assignment';

import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ListItem from 'material-ui/List/ListItem';

import CredentialValue from './CredentialValue';

import { 
    TYPE_CREDIT_CARD, 
    TYPE_SINGLE_VALUE, 
    TYPE_SITE_CREDENTIALS, 
    TYPE_LOGIN_PASSWORD
} from 'service/credentials';
import { 
    showSaveCredentialDialog, 
    showRemoveCredentialDialog,
    showCopyCredentialDialog,
    showCreateSimilarCredentialDialog
 } from 'actions/dialogs';

@connect(
    null,
    (dispatch) => ({
        showEditDialog: (credential) => dispatch(showSaveCredentialDialog(credential)),
        showRemoveDialog: (credential) => dispatch(showRemoveCredentialDialog(credential)),
        showCopyDialog: (credential) => dispatch(showCopyCredentialDialog(credential)),
        showCreateSimilarDialog: (credential) => dispatch(showCreateSimilarCredentialDialog(credential)),
    })
)
class Credential extends Component {
    static propTypes = {
        credential: PropTypes.object.isRequired,
        showEditDialog: PropTypes.func.isRequired,
        showRemoveDialog: PropTypes.func.isRequired,
        showCopyDialog: PropTypes.func.isRequired,
        showCreateSimilarDialog: PropTypes.func.isRequired
    };

    getIcon(type) {
        switch(type) {
            case TYPE_CREDIT_CARD: return (<CreditCardIcon/>);
            case TYPE_SITE_CREDENTIALS: return (<SiteIcon/>);
            case TYPE_LOGIN_PASSWORD: return (<LoginPasswordIcon/>);
            default: return (<MultipleValuesIcon/>);
        }
    }

    render() {
        const { showEditDialog, showRemoveDialog, showCopyDialog, showCreateSimilarDialog, credential } = this.props;
        const { type } = credential;

        const rightIconButton = (
            <IconMenu iconButtonElement={
                <IconButton touch>
                    <MoreVertIcon />
                </IconButton>}
            >
                <MenuItem onTouchTap={() => showEditDialog(credential)}>Edit</MenuItem>
                <MenuItem onTouchTap={() => showRemoveDialog(credential)}>Remove</MenuItem>
                <MenuItem onTouchTap={() => showCopyDialog(credential)}>Copy</MenuItem>
                <MenuItem onTouchTap={() => showCreateSimilarDialog(credential)}>Create similar</MenuItem>
            </IconMenu>
        );

        return type == TYPE_SINGLE_VALUE ?
            this.renderSinleValue(credential, rightIconButton):
            this.renderMultipeValue(credential, rightIconButton);
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