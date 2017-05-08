import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import ListViewHeader from '../components/ListViewHeader';
import CredentialsList from '../components/CredentialsList';
import CredentialDialog from '../components/CredentialDialog';
import RemoveCredential from '../components/RemoveCredential';

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
                <CredentialDialog/>
                <RemoveCredential/>
                <Snackbar open={false} message="" autoHideDuration={3000}/>
            </div>
        );
    }
}

export default ListView;