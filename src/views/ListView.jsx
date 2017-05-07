import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ListViewHeader from '../components/ListViewHeader';
import CredentialsList from '../components/CredentialsList';

@connect(
    (state) => ({
        keystore: state.keystore
    })
)
class ListView extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    static propTypes = {
        keystore: PropTypes.object
    }

    componentWillMount() {
        const { keystore } = this.props;
        const { router } = this.context;

        if(!keystore) {
            router.push('/');
        }
    }

    render() {
        return (
            <div>
                <ListViewHeader/>
                <CredentialsList/>
            </div>
        );
    }
}

export default ListView;