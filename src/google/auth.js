/* global gapi */
/* eslint camelcase: off */

// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '565101859468-6erukohej5tmihordce5j7krav3v86jo.apps.googleusercontent.com';
var API_KEY_ID = 'AIzaSyBFnq1P0EFgT-kS8uwVqcJHDWps5J9u-Ok';
var SCOPE = 'https://www.googleapis.com/auth/drive';
var DISCOVERY = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

export default new Promise((resolve, reject) => {
    /**
     * Check if current user has authorized this application.
     */

    gapi.load('client:auth2', () => {
        gapi.client.init({
            'apiKey': API_KEY_ID,
            'discoveryDocs': DISCOVERY,
            'clientId': CLIENT_ID,
            'scope': SCOPE
        }).then(() => {
            const GoogleAuth = gapi.auth2.getAuthInstance();

            //chek if user alredy sign in
            if (!GoogleAuth.isSignedIn.get()) {
                GoogleAuth.signIn();//open sign in dialog
                GoogleAuth.isSignedIn.listen(() => {
                    if(GoogleAuth.isSignedIn.get()) {
                        resolve(GoogleAuth.currentUser.get());
                    } else {
                        throw new Error('not authorized');//sign in fail in some reason
                    }
                });
            } else {
                resolve(GoogleAuth.currentUser.get());//yep already authorized
            }
        }, reject);
    }, reject);
});