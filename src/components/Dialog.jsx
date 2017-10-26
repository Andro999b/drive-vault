import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MuiDialog from 'material-ui/Dialog';
import FullScreanDailog from './FullScreanDailog';
import { isMobile } from '../service/utils';

class Dialog extends Component {
    static propTypes = {
        contentStyle: PropTypes.object,
        offMobileMode: PropTypes.bool,
    }

    static defaultMuiContentStyle = {
        maxWidth: 570,
        width: '100%'
    }

    render() {
        const { offMobileMode } = this.props;

        return !isMobile() || offMobileMode ? this.renderMuiDialog() : this.renderFullScrean();
    }

    renderFullScrean() {
        return (<FullScreanDailog {...this.props}/>);
    }

    renderMuiDialog() {
        const { contentStyle } = this.props;

        return (
            <MuiDialog 
                autoScrollBodyContent
                {...this.props}
                contentStyle={{ ...Dialog.defaultMuiContentStyle, ...contentStyle }} />
        );
    }
}

export default Dialog;