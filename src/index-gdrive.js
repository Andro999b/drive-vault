/* global gapi, addScript */

import { startUp }  from 'index';

// Client ID and API key from the Developer Console
var CLIENT_ID = '865137154549-4emsm32c10m6g281epq6i7akvblj97g9.apps.googleusercontent.com';
var API_KEY_ID = 'AIzaSyDzJSZ302P2yZfWpUedWcg3hlPudjL3SNE';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/drive';

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2:signin2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY_ID,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        const GoogleAuth = gapi.auth2.getAuthInstance();

        //chek if user alredy sign in
        if (!GoogleAuth.isSignedIn.get()) {
            var initialLoader = document.getElementById('initial-loader');

            initialLoader.style.display = 'none';
            gapi.signin2.render('sign-in', {
                scope: SCOPES,
                width: 280,
                height: 50,
                longtitle: true,
                theme: 'dark',
                onsuccess: function () {
                    initialLoader.style.display = 'block';
                    document.getElementById('sign-in').style.display = 'none';

                    startUp();
                }
            });
        } else {
            startUp();
        }
    });
}

addScript('https://apis.google.com/js/api.js').then(handleClientLoad);