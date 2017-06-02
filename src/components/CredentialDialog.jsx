import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import linkstate from 'linkstate';

import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import { hideSaveCredentialDialog } from '../actions/dialogs';
import saveCredential from '../actions/saveCredential';

@connect(
    (state) => ({
        credential: state.saveCredential,
        groups: state.groups
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
    onGroupChange = (event, index, value) => this.setState({credential: {...this.state.credential, group: value}})

    render() {
        const { credential, hideDialog, groups } = this.props;
        const errors = this.state.errors;
        const { group, name, value } = this.state.credential;

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
                        floatingLabelText="Enter name" 
                        autoComplete="new-password" 
                        errorText={errors.name}
                        fullWidth 
                        value={name} 
                        onChange={linkstate(this, 'credential.name')} />
                    <TextField 
                        floatingLabelText="Enter value" 
                        type="password" 
                        autoComplete="new-password" 
                        errorText={errors.value}
                        fullWidth 
                        value={value} 
                        onChange={linkstate(this, 'credential.value')} />
                </form>
            </Dialog>
        );
    }
}

export default CredentialDialog;