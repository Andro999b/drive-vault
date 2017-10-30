import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setMasterPassword, downloadFile } from 'actions/sagas';
import { setMasterPasswordError } from 'actions';

import Loader from 'components/Loader';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { callOnEnter } from 'service/utils';

@connect(
    (state) => ({
        dbInited: state.decrypt.db,
        fileLoading: state.decrypt.fileLoading,
        fileName: state.decrypt.fileName,
        masterPasswordError: state.decrypt.masterPasswordError
    }),
    (dispatch) => ({
        downloadFile: (fileId) => dispatch(downloadFile(fileId)),
        setMasterPassword: (password) => dispatch(setMasterPassword(password)),
        clearPasswordError: () => dispatch(setMasterPasswordError(null))
    }),
    (stateProps, dispatchProps, ownProps) => ({
        ...stateProps,
        ...dispatchProps,
        ...ownProps.match.params,
        history: ownProps.history
    })
)
class DecryptView extends Component {
    static propTypes = {
        dbInited: PropTypes.bool,
        fileLoading: PropTypes.bool,
        fileName: PropTypes.string,
        fileId: PropTypes.string,
        masterPasswordError: PropTypes.string,
        setMasterPassword: PropTypes.func.isRequired,
        downloadFile: PropTypes.func.isRequired,
        clearPasswordError: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            password: ''
        };
    }

    componentWillMount() {
        const { fileId, fileName, dbInited, history, downloadFile, clearPasswordError } = this.props;

        clearPasswordError();

        if(dbInited) {
            history.push('/list');
            return;
        }

        if(fileId) {
            downloadFile(fileId);
        } else if(!fileName) {
            history.push('/');
        }
    }

    decryptFile() {
        this.props.setMasterPassword(this.state.password);
    }

    onChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    render() {
        const { password } = this.state;
        const { masterPasswordError, fileLoading } = this.props;
        
        return (
            <div>
                {fileLoading && <Loader />}
                {!fileLoading &&
                    <div className="initial-view">
                        <div>
                            <TextField
                                autoFocus
                                fullWidth
                                value={password}
                                onKeyDown={callOnEnter(this.decryptFile.bind(this))}
                                onChange={(e) => this.onChange(e)}
                                hintText="Enter master password"
                                floatingLabelText="Enter master password"
                                errorText={masterPasswordError}
                                type="password" />
                            <br />
                            <RaisedButton label="Ok" primary fullWidth onClick={() => this.decryptFile()} />
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default DecryptView;