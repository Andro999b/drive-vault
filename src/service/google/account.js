/* global googleAuthUser */

export function getUserId() {
    return new Promise((resolve, reject) => {
        if (!googleAuthUser) {
            reject(new Error('not authorized'));
        } else {
            resolve(googleAuthUser.id);
        }
    });
}