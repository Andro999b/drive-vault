import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MuiDialog from 'material-ui/Dialog';

class Dialog extends Component {
    static propTypes = {
        contentStyle: PropTypes.object
    }

    render() {
        const { contentStyle } = this.props;

        return (
            <MuiDialog {...this.props} contentStyle={{width: '100%', ...contentStyle}}/>
        );
    }
}

export default Dialog;