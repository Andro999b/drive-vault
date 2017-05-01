import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import { render } from 'react-dom';

import './favicon.png';
import './styles.scss';

import App from 'App';
import store from './store';
import initAction from './actions/init';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

store
    .dispatch(initAction())
    .then(() => {
        render(<App store={store}/>, document.getElementById('root'));
    });
