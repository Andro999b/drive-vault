import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MuiDialog from 'material-ui/Dialog';

class Dialog extends Component {
    static propTypes = {
        contentStyle: PropTypes.object
    }

    static defaultContentStyle = {
        maxWidth: 570,
        width: '100%'
    }

    render() {
        const { contentStyle } = this.props;

        return (
            <MuiDialog 
                autoScrollBodyContent
                {...this.props}
                contentStyle={{ ...Dialog.defaultContentStyle, ...contentStyle }} />
        );
    }
}

export default Dialog;