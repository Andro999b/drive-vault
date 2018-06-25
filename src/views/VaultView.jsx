import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { downloadFile } from 'actions/sagas';

import Loader from 'components/Loader';
import MainView from './MainView';
import DecryptView from './DecryptView';

@connect(
    (state) => ({
        fileId: state.decrypt.fileId,
        decrypted: state.decrypt.decrypted,
        fileLoading: state.decrypt.fileLoading
    }),
    (dispatch) => ({
        downloadFile: (fileId) => dispatch(downloadFile(fileId))
    })
)
class VaultView extends Component {
    static propTypes = {
        decrypted: PropTypes.bool,
        fileLoading: PropTypes.bool,
        fileId: PropTypes.string,
        match: PropTypes.object.isRequired,
        downloadFile: PropTypes.func.isRequired,
    }

    componentWillMount() {
        const { match, fileId, downloadFile } = this.props;
        const pathFileId = match.params.fileId;

        if(pathFileId != fileId) 
            downloadFile(pathFileId);
    }

    render() {
        const { decrypted, fileLoading } = this.props;

        if(fileLoading)
            return (<Loader/>);
        else if(decrypted)
            return (<MainView/>);
        else
            return (<DecryptView/>);
    }
}

export default VaultView;