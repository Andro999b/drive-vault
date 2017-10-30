import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Dialog from './Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import { hideSaveGroupDialog } from 'actions/dialogs';
import { saveGroup } from 'actions/sagas';

import { noEmptyValue} from 'service/validations';
import { callOnEnter } from 'service/utils';

@connect(
    (state) => ({
        group: state.dialogs.saveGroup
    }),
    (dispatch) => ({
        hideDialog: () => dispatch(hideSaveGroupDialog()),
        save: (group) => dispatch(saveGroup(group))
    })
)
class GroupDialog extends Component {
    static propTypes = {
        group: PropTypes.object,
        hideDialog: PropTypes.func.isRequired,
        save: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            group: props.group ? {...props.group} : {} 
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            errors: {},
            group: props.group ? {...props.group} : {} 
        });
    }

    onGroupNameChange(e) {
        const name = e.target.value;
        this.setState((state) => ({group: {...state.group, name}}));
    }

    onSave() {
        const { group } = this.state;
        let errors = {};

        const nameError = noEmptyValue(group.name);
        if(nameError) errors.name = nameError;

        this.setState({errors});

        if(Object.keys(errors).length == 0)
            this.props.save(this.state.group);
    }

    render() {
        const { hideDialog, group } = this.props;
        const errors = this.state.errors;
        const { name } = this.state.group;

        const actions = [
            <FlatButton key={0} onTouchTap={hideDialog} label="Cancel" primary />,
            <FlatButton key={1} onTouchTap={this.onSave.bind(this)} label="Save" primary />,
        ];

        return (
            <Dialog title="Group" open={group != null} actions={actions} onRequestClose={hideDialog}>
                <form autoComplete="off">
                    <TextField
                        autoFocus
                        onKeyDown={callOnEnter(this.onSave.bind(this))}
                        floatingLabelText="Group name"
                        autoComplete="new-password"
                        errorText={errors.name}
                        fullWidth
                        value={name||''}
                        onChange={this.onGroupNameChange.bind(this)}
                    />
                </form>
            </Dialog>
        );
    }
}

export default GroupDialog;