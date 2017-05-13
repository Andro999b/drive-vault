/* global gapi*/

import setEncryptedData from './setEncryptedData';

const KEYSTORE_FILENAME = 'gdrivekeystore';

function download(id) {
    return gapi.client.drive.files.get({
        fileId: id,
        alt: 'media'
    }).then((res) => res.body);
}

export const loadStorage = () => (dispath) => 
    gapi.client.drive.files.list({
        q: `name = '${KEYSTORE_FILENAME}'`,
        fields: 'files(id,webContentLink)'
    }).then((res) => {
        const files = res.result.files;

        if(files.length > 0)
            return download(files[0].id).then((data) => {
                
                dispath(setEncryptedData(data));
            });

        return Promise.resolve(dispath(setEncryptedData(null)));
    });