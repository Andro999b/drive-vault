/* global gapi*/

import { showToast } from './toast';
import { setFile } from '.';

const KEYSTORE_FILENAME = 'gdrivekeystore';

function download(id) {
    return gapi.client.drive.files.get({
        fileId: id,
        alt: 'media'
    }).then((res) => res.body);
}

export const loadStorage = () => (dispath) => {
    gapi.client.drive.files.list({
        q: `name = '${KEYSTORE_FILENAME}' and trashed != true`,
        fields: 'files(id,webContentLink)'
    }).then((res) => {
        const files = res.result.files;

        if(files.length > 0) {
            const id = files[0].id;
            return download(id).then((data) => {
                dispath(setFile(id, data));
            });
        }

        return Promise.resolve(dispath(setFile(null, null)));
    });
};

export const saveStorage = (fileId, fileData) => (dispath) =>  {
    upload({
        fileId,
        metadata: {
            name: KEYSTORE_FILENAME,
            mimeType: 'text/plain'
        },
        body: fileData
    })
    .then((r) => {
        dispath(setFile(r.id));
        dispath(showToast('Database synchronized'));
    })
    .catch(() => dispath(showToast('Database synchronize fail')));
};

function upload({
    fileId,
    metadata, 
    body
}) {
    const request = new XMLHttpRequest();
    const GoogleAuth = gapi.auth2.getAuthInstance();
    const currentUser = GoogleAuth.currentUser.get();
    const authResponse = currentUser.getAuthResponse();

    let requestBody;

    if(fileId == null) {
        const boundary = '-------314159265358979323846';
        const delimiter = `\r\n--${boundary}\r\n`;
        const closeDelimiter = `\r\n--${boundary}--`;

        requestBody = `${delimiter}content-type: application/json\r\n\r\n` +
            JSON.stringify(metadata) +
            `${delimiter}` +
             `content-type: ${metadata.mimeType}\r\n\r\n` +
            body + 
            closeDelimiter;

        request.open('POST', `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart`);
        request.setRequestHeader('Content-Type', `multipart/form-data; boundary="${boundary}"`);
    } else {
        request.open('PATCH', `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`);
        requestBody = body;
    }
    request.setRequestHeader('Authorization', `${authResponse.token_type} ${authResponse.access_token}`);

    return new Promise(function(resolve, reject) {
        //finish listener
        request.addEventListener('load', (e) => {
            if(request.status == 200) {
                resolve(JSON.parse(request.responseText));
            } else {
                reject(e);
            }  
        });
        //fail listener
        request.addEventListener('error', (e) => {
            reject(e);
        });

        request.send(requestBody);
    });
}