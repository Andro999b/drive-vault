import React, { Component } from 'react';

import history from './history';
import { Router, Switch, Route, Redirect} from 'react-router-dom';

import ListView from './views/ListView';
import InitialView from './views/InitialView';

class AppRouter extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={InitialView} />
                    <Route path="/list" component={ListView} />
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
        );
    }
}

export default AppRouter;