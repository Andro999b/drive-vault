/* global gapi, addScript */

import * as googleAccount from 'service/google/account';
import * as driveFs from 'service/google/drive';
import { createRootUrl } from 'service/utils';

import { setAccountImpl } from 'service/account';
import { setFsImpl } from 'service/fs';

import { startUp }  from 'index';

function perpereEnvAndStart() {
    const GoogleAuth = gapi.auth2.getAuthInstance();

    if(GoogleAuth.isSignedIn.get()){
        const user = GoogleAuth.currentUser.get();

        window.googleAuthUser = {
            id: user.getId(),
            accessToken: user.getAuthResponse().access_token
        };
    }
        
    setAccountImpl(googleAccount);
    setFsImpl(driveFs);

    startUp();
}

// Client ID and API key from the Developer Console
const CLIENT_ID = '1087481340137-7skq9l9tepoqab7kbj62euh9bc9jfbq1.apps.googleusercontent.com';
const API_KEY_ID = 'AIzaSyBcbb9JFfE9LcnPVn5-9EklhHjQ6H8plK4';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/drive';

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
            const initialLoader = document.getElementById('initial-loader');

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

                    perpereEnvAndStart();
                }
            });
        } else {
            if (location.search === '?logout') {
                GoogleAuth.signOut().then(function() { location.href = createRootUrl(''); });
            } else {
                perpereEnvAndStart();
            }
        }
    });
}

addScript('https://apis.google.com/js/api.js').then(handleClientLoad);