import * as dropboxAccount from 'service/dropbox/account';
import * as dropboxFs from 'service/dropbox/fs';

import { setAccountImpl } from 'service/account';
import { setFsImpl } from 'service/fs';

import { startUp } from 'index';

import { getSetting, setSetting } from 'service/settings';
import { paramsFromUrlHash } from 'service/utils';

const CLIENT_ID = '8zndpg2utacop6a';

authenticate(CLIENT_ID)
    .then(() => {
        setAccountImpl(dropboxAccount);
        setFsImpl(dropboxFs);

        startUp();
    });

function authenticate() {
    let token = getSetting('dropbox_token');
    let csrfToken = getSetting('dropbox_csrf');

    if (token)
        return Promise.resolve(token);

    const params = paramsFromUrlHash();
    const redirectUri = window.location.origin + window.location.pathname;

    if (params.state && csrfToken && params.state == csrfToken) {
        // we are returning from authentication redirect
        if (params.access_token) {
            // the authentcation was successful
            setSetting('dropbox_token', params.access_token);
            setSetting('dropbox_csrf', '');

            window.location.replace(redirectUri);
        } else {
            // the authentication was not successful
            return Promise.reject(params);
        }
    } else {
        // initiate authentication
        csrfToken = '' + Math.floor(Math.random() * 100000);
        setSetting('dropbox_csrf', csrfToken);

        window.location = 'https://www.dropbox.com/1/oauth2/authorize?response_type=token&'
            + 'client_id=' + encodeURIComponent(CLIENT_ID) + '&'
            + 'redirect_uri=' + encodeURIComponent(redirectUri) + '&'
            + 'state=' + encodeURIComponent(csrfToken);
    }

    return new Promise(() => {});
}