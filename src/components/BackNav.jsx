import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import { grey800 as backColor } from 'material-ui/styles/colors';

class BackNav extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func
    };

    render() {
        const {label, onClick} = this.props;

        return (
            <div className="back-nav">
                <div onClick={onClick}>
                    <BackIcon color={backColor} />
                    <span className="back-nav__label" style={{ color: backColor }}>{label}</span>
                </div>
            </div>
        );
    }
}

export default BackNav;