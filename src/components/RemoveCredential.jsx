import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class RemoveCredential extends Component {
    static propTypes = {
        credential: PropTypes.object
    };

    render() {
        const { credential } = this.props;
        const name = credential? credential.name : null;

        const actions = [
            <FlatButton key={0} label="Cancel" primary />,
            <FlatButton key={1} label="Remove" primary />,
        ];

        return (
            <Dialog open={credential != null} actions={actions}>
                Remove credential {name} ? 
            </Dialog>
        );
    }
}

export default RemoveCredential;