/* global firebase, gapi, addScript */

import * as googleAccount from 'service/google/account';
import * as driveFs from 'service/google/drive';

import { setAccountImpl } from 'service/account';
import { setFsImpl } from 'service/fs';

import { startUp } from 'index';

function perpereEnvAndStart() {
    setAccountImpl(googleAccount);
    setFsImpl(driveFs);

    startUp();
}

const SCOPE = 'https://www.googleapis.com/auth/drive';

function handleClientLoad() {
    var config = {
        apiKey: 'AIzaSyBhHWZdxD-VZUX651HlDekGTbDa2HRY4j0',
        authDomain: 'drive-vault.firebaseapp.com',
        databaseURL: 'https://drive-vault.firebaseio.com',
        projectId: 'drive-vault',
        storageBucket: 'drive-vault.appspot.com',
        messagingSenderId: '594812009059'
    };
    firebase.initializeApp(config);

    gapi.load('client:auth2:signin2', initClient);
}

function initClient() {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope(SCOPE);
            firebase.auth().signInWithRedirect(provider);
        } else {
            console.log(user.providerData);
            console.log(user);
            console.log(firebase.auth());
        }
    });
}

Promise.all([
    addScript('https://www.gstatic.com/firebasejs/4.13.0/firebase.js'),
    addScript('https://apis.google.com/js/api.js')
]).then(handleClientLoad);