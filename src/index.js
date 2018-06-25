import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';

import './favicon.png';
import './styles.scss';

import App from 'App';
import store from './store';

import { WAIT_FOR_ACTION } from 'redux-wait-for-action';
import { INIT, INIT_FINISH } from './actions/sagas';
import { SYNCRONIZED } from './service/db/sync-status';

export function startUp() {
    store
        .dispatch({
            type: INIT,
            [WAIT_FOR_ACTION]: INIT_FINISH
        })
        .then(() => {
            render(<App store={store} />, document.getElementById('root'));
        });

    // prevent close window if db not syncronizes
    store.subscribe(() => {
        if (SYNCRONIZED == store.getState().main.syncStatus) {
            window.onbeforeunload = null;
        } else {
            window.onbeforeunload = function () {
                return 'Database synchronization in progress. Please wait until it finish.';
            };
        }
    });
}
