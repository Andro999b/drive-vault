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

@connect(
    (state) => ({
        credential: state.dialogs.saveCredential,
        groups: state.main.groups
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
        groups: PropTypes.array,
        save: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            credential: props.credential ? {...props.credential} : {}
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            errors: {},
            credential: props.credential ? {...props.credential} : {}
        });
    }

    save() {
        const { credential } = this.state;
        let errors = {};

        if(!credential.name){
            errors.name = 'Cant be empty';
        }

        if(!credential.value){ 
            errors.value = 'Cant be empty';
        }

        this.setState({errors});

        if(Object.keys(errors).length == 0)
            this.props.save(credential);
    }

    //eslint-disable-next-line no-unused-vars
    onGroupChange(event, index, value) {
        this.setState((state) => ({credential: {...state.credential, group: value}}));
    }

    onNameChange(e) {
        this.setState((state) => ({group: {...state.credential, name: e.target.value}}));
    }

    render() {
        const { credential, hideDialog, groups } = this.props;
        const errors = this.state.errors;
        const { group, name } = this.state.credential;

        const actions = [
            <FlatButton key={0} onTouchTap={hideDialog} label="Cancel" primary />,
            <FlatButton key={1} onTouchTap={this.save.bind(this)} label="Save" primary />,
        ];

        return (
            <Dialog
                title="Credential"
                open={credential != null}
                actions={actions}
                onRequestClose={hideDialog}
            >
                <form autoComplete="off">
                    <SelectField floatingLabelText="Select Group" fullWidth value={group} onChange={this.onGroupChange.bind(this)}>
                        <MenuItem value={null}/>
                        {groups.map((item) => <MenuItem key={item.id} value={item.id} primaryText={item.name} />)}
                    </SelectField>
                    <TextField 
                        floatingLabelText="Enter title" 
                        autoComplete="new-password" 
                        errorText={errors.name}
                        fullWidth 
                        value={name} 
                        onChange={this.onNameChange.bind(this)} />
                    {/*<TextField 
                        floatingLabelText="Enter value" 
                        type="password" 
                        autoComplete="new-password" 
                        errorText={errors.value}
                        fullWidth 
                        multiLine
                        value={value} 
                    onChange={linkstate(this, 'credential.value')} />*/}
                </form>
            </Dialog>
        );
    }
}

export default CredentialDialog;