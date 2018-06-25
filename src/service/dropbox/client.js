import * as Dropbox from 'dropbox';

import { getSetting } from 'service/settings';

let client;

export function getClient () {
    if (!client) {
        const token = getSetting('dropbox_token') ;

        if(!token)
            throw new Error('No dropbox token');

        client = new Dropbox({ accessToken: getSetting('dropbox_token') });
    }

    return client;
}