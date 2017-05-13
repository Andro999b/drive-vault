import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ListViewHeader from '../components/ListViewHeader';
import CredentialsList from '../components/CredentialsList';
import Toast from '../components/Toast';

@connect(
    (state) => ({
        dbInited: state.dbInited
    })
)
class ListView extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    static propTypes = {
        dbInited: PropTypes.bool
    }

    componentWillMount() {
        const { dbInited } = this.props;
        const { router } = this.context;

        if(!dbInited) {
            router.push('/');
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