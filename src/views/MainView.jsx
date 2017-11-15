import React, { Component } from 'react';

import ListViewHeader from 'components/ListViewHeader';
import CredentialsList from 'components/CredentialsList';
import Toast from 'components/Toast';

class MainView extends Component {
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

export default MainView;