/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RenderToLayer from 'material-ui/internal/RenderToLayer';
import ReactTransitionGroup from 'react-transition-group/TransitionGroup';

class TransitionItem extends Component {
    static propTypes = {
        children: PropTypes.node,
        style: PropTypes.object,
    }

    state = { style: {opacity: 0} };

    componentWillUnmount() {
        clearTimeout(this.enterTimeout);
        clearTimeout(this.leaveTimeout);
    }

    componentWillEnter(callback) {
        this.componentWillAppear(callback);
    }

    componentWillAppear(callback) {
        setTimeout(() => {
            this.setState({ style: { opacity: 1, transition: 'opacity .20s ease-out' } });
            this.enterTimeout = setTimeout(callback, 200); // matches transition duration
        }, 20);
    }

    componentWillLeave(callback) {
        this.setState({ style: { opacity: 0, transition: 'opacity .4s ease-in-out' } });
        this.leaveTimeout = setTimeout(callback, 400); // matches transition duration
    }

    render() {
        const { style, children, ...other } = this.props;

        return (
            <div {...other} style={{ ...this.state.style, ...style }}>
                {children}
            </div>
        );
    }
}

class FullScreanDialog extends Component {
    static propTypes = {
        title: PropTypes.string,
        actions: PropTypes.array,
        open: PropTypes.bool,
        children: PropTypes.node,
    };

    renderLayer() {
        const { title, open, children, actions } = this.props;

        return (
            <ReactTransitionGroup
                component="div"
                transitionAppear
                transitionEnter
            >
                {open && <TransitionItem className="full-screan-dialog">
                    <div className="full-screan-dialog__body">
                        {title && <div className="full-screan-dialog__title">
                            {title}
                        </div>}
                        <div className="full-screan-dialog__content">
                            {children}
                        </div>
                        {actions && <div className="full-screan-dialog__actions">
                            {actions}
                        </div>}
                    </div>
                </TransitionItem>}
            </ReactTransitionGroup>
        );
    }

    render() {
        return (
            <RenderToLayer render={this.renderLayer.bind(this)} open useLayerForClickAway={false} />
        );
    }
}

export default FullScreanDialog;