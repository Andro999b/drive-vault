import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ListViewHeader from 'components/ListViewHeader';
import CredentialsList from 'components/CredentialsList';
import Toast from 'components/Toast';

@connect(
    (state) => ({
        dbInited: state.decrypt.db
    })
)
class ListView extends Component {
    static propTypes = {
        dbInited: PropTypes.bool,
        history: PropTypes.object.isRequired
    }

    componentWillMount() {
        const { dbInited, history } = this.props;
        if(!dbInited) history.push('/');
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