import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dialog from './Dialog';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import { hideSaveCredentialDialog } from 'actions/dialogs';
import { saveCredential } from 'actions/sagas';

import CredentialSingleValue from './credential-dialog/CredentialSingleValue';
import CredentialMultipleValues from './credential-dialog/CredentialMultipleValues';
import CredentialShemeValues from './credential-dialog/CredentialShemeValues';

import { isMobile } from 'service/utils';

import {
    allTypes,
    TYPE_MULTI_VALUE, TYPE_SINGLE_VALUE,
    getSchema, getValidator, getTypeName
} from 'service/credentials';

import {
    noEmptyValue
} from 'service/validations';

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
        const { name, type } = credential;

        //filter field 
        let schema = getSchema(type);
        const values =
            !schema ?
                credential.values :
                credential.values.filter((value) =>
                    schema.find((field) => field.name == value.name)
                );

        let errors = {};

        const nameError = noEmptyValue(name);
        if (nameError) errors.name = nameError;

        const validator = getValidator(type);
        if (validator) {
            const valueErrors = validator(values);
            if (valueErrors) errors.values = valueErrors;
        }

        this.setState({ errors });

        //filter all fields before save
        credential.values = values;

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
        const { credential, hideDialog } = this.props;

        const actions = [
            <FlatButton key={0} onClick={hideDialog} label="Cancel" primary />,
            <FlatButton key={1} onClick={this.save.bind(this)} label="Save" primary />,
        ];

        return (
            <Dialog title="Credential" open={credential != null} actions={actions} onRequestClose={hideDialog}>
                <form autoComplete="off">
                    {this.renderTitleInput()}
                    {this.renderGroupAndTypeSelectors()}
                    {this.renderValueEditor()}
                </form>
            </Dialog>
        );
    }

    renderTitleInput() {
        const { errors } = this.state;
        const { name } = this.state.credential;

        return (
            <TextField
                autoFocus
                floatingLabelText="Enter title"
                floatingLabelFixed
                autoComplete="new-password"
                errorText={errors.name}
                fullWidth
                value={name || ''}
                onChange={this.onNameChange.bind(this)} />
        );
    }

    renderGroupAndTypeSelectors() {
        const { avaliableGroups } = this.props;
        const { groups, type } = this.state.credential;
        const hasAvaliableGroups = avaliableGroups.length > 0;
        const mobile = isMobile();

        return (
            <div>
                {hasAvaliableGroups && <SelectField
                    multiple
                    className="row-first-cell"
                    floatingLabelText="Select Group"
                    floatingLabelFixed
                    value={groups}
                    fullWidth={mobile}
                    onChange={this.onGroupChange.bind(this)}>
                    {avaliableGroups.map((item) =>
                        (<MenuItem
                            key={item.id}
                            value={item.id}
                            checked={groups && groups.indexOf(item.id) > -1}
                            primaryText={item.name} />)
                    )}
                </SelectField>}
                <SelectField
                    fullWidth={mobile || !hasAvaliableGroups}
                    floatingLabelText="Select Type"
                    floatingLabelFixed
                    value={type}
                    onChange={this.onTypeChange.bind(this)}>
                    {allTypes.map((item) => <MenuItem key={item} value={item} primaryText={getTypeName(item)} />)}
                </SelectField>
            </div>
        );
    }

    renderValueEditor() {
        const { errors, credential } = this.state;
        const { type, values } = credential;

        const schema = getSchema(type);
        let ValueEditor;
        switch (type) {
            case TYPE_SINGLE_VALUE: ValueEditor = CredentialSingleValue; break;
            case TYPE_MULTI_VALUE: ValueEditor = CredentialMultipleValues; break;
            default: ValueEditor = schema ? CredentialShemeValues : CredentialSingleValue;
        }

        return (
            <ValueEditor
                values={values}
                errors={errors.values}
                schema={schema}
                onChange={this.onValuesChange.bind(this)} />
        );
    }
}

export default CredentialDialog;