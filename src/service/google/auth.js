/* global gapi */
/* eslint camelcase: off */

export default function () {
    return new Promise((resolve, reject) => {
        const GoogleAuth = gapi.auth2.getAuthInstance();

        if (!GoogleAuth.isSignedIn.get()) {
            reject(new Error('not authorized'));
        } else {
            resolve(GoogleAuth.currentUser.get());//yep already authorized
        }
    });
}