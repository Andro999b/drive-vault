import React, { Component } from 'react';

import history from './history';
import { Router, Switch, Route, Redirect} from 'react-router-dom';

import ListView from './views/ListView';
import DecryptView from './views/DecryptView';
import FileSelectView from './views/FileSelectView';

class AppRouter extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={FileSelectView}/> 
                    <Route exact path="/file/new" component={DecryptView} />
                    <Route path="/file/:fileId" component={DecryptView} />
                    <Route path="/list" component={ListView} />
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
        );
    }
}

export default AppRouter;  