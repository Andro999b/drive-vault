import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dialog from './Dialog';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import { hideSaveCredentialDialog } from '../actions/dialogs';
import { saveCredential } from '../actions/sagas';

import CredentialSingleValue from './credential-dialog/CredentialSingleValue';
import CredentialMultipleValues from './credential-dialog/CredentialMultipleValues';
import CredentialShemeValues from './credential-dialog/CredentialShemeValues';

import {
    allTypes,
    TYPE_MULTI_VALUE, TYPE_SINGLE_VALUE,
    getSchema, getValidator, getTypeName
} from '../service/credentials';

import {
    noEmptyValue
} from '../service/validations';

@connect(
    (state) => ({
        credential: state.dialogs.saveCredential,
        selectedGroup: state.main.selectedGroup,
        avaliableGroups: state.main.groups
    }),
    (dispatch) => ({
        hideDialog: () => dispatch(hideSaveCredentialDialog()),
        save: (credential) => dispatch(saveCredential(credential))
    })
)
class CredentialDialog extends Component {
    static propTypes = {
        credential: PropTypes.object,
        hideDialog: PropTypes.func.isRequired,
        avaliableGroups: PropTypes.array,
        selectedGroup: PropTypes.object,
        save: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = this.convertPropsToSate(props);
    }

    componentWillReceiveProps(props) {
        this.setState(this.convertPropsToSate(props));
    }

    convertPropsToSate(props) {
        const { selectedGroup } = this.props;
        const groups = selectedGroup && [selectedGroup.id] || [];

        return {
            errors: {},
            credential: { groups, ...props.credential }
        };
    }

    save() {
        const { credential } = this.state;
        const { name, type, values } = credential;
        let errors = {};

        const nameError = noEmptyValue(name);
        if(nameError) errors.name = nameError;

        const validator = getValidator(type);
        if (validator) {
            const valueErrors = validator(values);
            if (valueErrors) errors.values = valueErrors;
        }

        this.setState({ errors });

        if (Object.keys(errors).length == 0)
            this.props.save(credential);
    }

    //eslint-disable-next-line no-unused-vars
    onGroupChange(event, index, groups) {
        this.setState((state) => ({ credential: { ...state.credential, groups } }));
    }

    //eslint-disable-next-line no-unused-vars
    onTypeChange(event, index, type) {
        this.setState((state) => ({ credential: { ...state.credential, type } }));
    }

    onNameChange(e) {
        const name = e.target.value;
        this.setState((state) => ({ credential: { ...state.credential, name } }));
    }

    onValuesChange(values) {
        this.setState((state) => ({ credential: { ...state.credential, values } }));
    }

    render() {
        const { credential, hideDialog, avaliableGroups } = this.props;
        const errors = this.state.errors;
        const { groups, name, type, values } = this.state.credential;

        const actions = [
            <FlatButton key={0} onTouchTap={hideDialog} label="Cancel" primary />,
            <FlatButton key={1} onTouchTap={this.save.bind(this)} label="Save" primary />,
        ];

        const schema = getSchema(type);
        let ValueEditor;
        switch (type) {
            case TYPE_SINGLE_VALUE: ValueEditor = CredentialSingleValue; break;
            case TYPE_MULTI_VALUE: ValueEditor = CredentialMultipleValues; break;
            default: ValueEditor = schema ? CredentialShemeValues : CredentialSingleValue;
        }

        return (
            <Dialog
                title="Credential"
                open={credential != null}
                actions={actions}
                onRequestClose={hideDialog}
            >
                <form autoComplete="off">
                    <TextField
                        autoFocus
                        floatingLabelText="Enter title"
                        autoComplete="new-password"
                        errorText={errors.name}
                        fullWidth
                        value={name||''}
                        onChange={this.onNameChange.bind(this)} />
                    <div>
                        <SelectField 
                            multiple 
                            className="row-first-cell"  
                            floatingLabelText="Select Group" 
                            value={groups} 
                            onChange={this.onGroupChange.bind(this)}>
                            {avaliableGroups.map((item) => 
                                (<MenuItem 
                                    key={item.id} 
                                    value={item.id} 
                                    checked={groups && groups.indexOf(item.id) > -1}
                                    primaryText={item.name} />)
                            )}
                        </SelectField>
                        <SelectField floatingLabelText="Select Type" value={type} onChange={this.onTypeChange.bind(this)}>
                            {allTypes.map((item) => <MenuItem key={item} value={item} primaryText={getTypeName(item)} />)}
                        </SelectField>
                    </div>
                    <ValueEditor
                        values={values}
                        errors={errors.values}
                        schema={schema}
                        onChange={this.onValuesChange.bind(this)} />
                </form>
            </Dialog>
        );
    }
}

export default CredentialDialog;