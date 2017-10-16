import 'regenerator-runtime/runtime';
import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import { render } from 'react-dom';

import './favicon.png';
import './styles.scss';

import App from 'App';
import store from './store';

import { WAIT_FOR_ACTION } from 'redux-wait-for-action';
import { INIT, INIT_FINISH } from './sagas/actions';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

store
    .dispatch({
        type: INIT,
        [WAIT_FOR_ACTION]: INIT_FINISH
    })
    .then(() => {
        render(<App store={store}/>, document.getElementById('root'));
    });