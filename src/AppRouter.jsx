import React, { Component, PropTypes } from 'react';

import { Router, IndexRoute, Route, Redirect, hashHistory as history} from 'react-router';

import ListView from './views/ListView';
import InitialView from './views/InitialView';

class AppRouter extends Component {
    static propTypes = {
        masterPasswordRsa: PropTypes.object,
    }

    render() {
        return (
            <Router history={history}>
                <Route path="/">
                    <IndexRoute component={InitialView} />
                    <Route path="list" component={ListView} />
                    <Redirect from="*" to="/" />
                </Route>
            </Router>
        );
    }
}

export default AppRouter;