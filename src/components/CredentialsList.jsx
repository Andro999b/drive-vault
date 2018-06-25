import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { List } from 'material-ui/List';
import Credential from './Credential';

import CredentialDialog from './dialogs/CredentialDialog';
import RemoveCredentialDialog from './dialogs/RemoveCredentialDialog';

@connect(
    (state) => ({
        credentials: state.main.credentials
    })
)
class CredentialList extends Component {
    static propTypes = {
        credentials: PropTypes.array.isRequired
    }

    render() {
        const { credentials } = this.props;

        return (
            <div>
                <List>
                    {credentials.map((credential) =>
                        <Credential key={credential.id} credential={credential} />
                    )}
                </List>
                <CredentialDialog />
                <RemoveCredentialDialog />
            </div>
        );
    }
}

export default CredentialList;
