import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {List} from 'material-ui/List';
import Credential from './Credential';

class CredentialList extends Component {
    static propTypes = {

    }
    
    render() {
        return (
            <List>
                <Credential credential={{name: 'test', value: 'test value'}}/>
            </List>
        );
    }
}

export default CredentialList;
