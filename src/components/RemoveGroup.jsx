import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class RemoveGroup extends Component {
    static propTypes = {
        name: PropTypes.string
    };

    render() {
        const { name } = this.props;

        const actions = [
            <FlatButton key={0} label="Cancel" primary />,
            <FlatButton key={1} label="Remove" primary />,
        ];

        return (
            <Dialog open={name != null} actions={actions}>
                Remove group {name} ? 
            </Dialog>
        );
    }
}

export default RemoveGroup;