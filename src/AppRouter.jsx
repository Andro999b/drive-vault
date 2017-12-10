import React, { Component } from 'react';

import history from './service/history';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import VaultView from './views/VaultView';
import CreateNewView from './views/CreateNewView';
import FileSelectView from './views/FileSelectView';

class AppRouter extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={FileSelectView}/> 
                    <Route exact path="/vault/new" component={CreateNewView} />
                    <Route path="/vault/:fileId" component={VaultView} />
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
        );
    }
}

export default AppRouter;  