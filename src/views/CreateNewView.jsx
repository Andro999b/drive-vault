import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import BackNav from 'components/BackNav';
import MasterPasswordView from './MasterPasswordView';
import Loader from 'components/Loader';

@connect(
    ({decrypt: {fileName, fileLoading}}) => ({ fileName, fileLoading }),
)
class CreateNewView extends Component {
    static propTypes = {
        fileName: PropTypes.string,
        fileLoading: PropTypes.bool,
        history: PropTypes.object.isRequired,
    }

    componentWillMount() {
        const { fileName, history } = this.props;

        if (!fileName)
            history.push('/');
    }

    render() {
        const { fileLoading } = this.props;

        if (fileLoading) {
            return (<Loader/>);
        } else {
            return (
                <div className="decrypt-view">
                    <div className="decrypt-view__header">
                        <Link to="/">
                            <BackNav label="Back to vaults" />
                        </Link>
                        {/*decript method switcher*/}
                    </div>
                    <MasterPasswordView newVault />
                </div>
            );
        }
    }
}

export default CreateNewView;