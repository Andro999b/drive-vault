import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Loader from 'components/Loader';
import MasterPasswordView from './DecryptView';

@connect(
    (state) => ({
        fileName: state.decrypt.fileName,
        fileLoading: state.decrypt.fileLoading
    }),
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

        return (
            <div>
                {fileLoading && <Loader />}
                {!fileLoading && <MasterPasswordView newVault/>}
            </div>
        );
    }
}

export default CreateNewView;