import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ListViewHeader from '../components/ListViewHeader';
import CredentialsList from '../components/CredentialsList';
import Toast from '../components/Toast';
import history from '../history';

@connect(
    (state) => ({
        dbInited: state.dbInited
    })
)
class ListView extends Component {
    static propTypes = {
        dbInited: PropTypes.bool
    }

    componentWillMount() {
        const { dbInited } = this.props;
        if(!dbInited) {
            history.push('/');
        }
    }

    render() {
        return (
            <div>
                <ListViewHeader/>
                <CredentialsList/>
                <Toast/>
            </div>
        );
    }
}

export default ListView;