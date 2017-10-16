/* global gapi*/

const KEYSTORE_FILENAME = 'gdrivekeystore2';

export function fileList() {
    return gapi.client.drive.files.list({
        q: `name = '${KEYSTORE_FILENAME}' and trashed != true`,
        fields: 'files(id,webContentLink)'
    }).then((res) => res.result.files);
}

export function download(fileId) {
    return gapi.client.drive.files.get({
        fileId: fileId,
        alt: 'media'
    }).then((res) => res.body);
}

export function upload({fileId, fileName, body}) {
    const metadata = {
        name: fileName || KEYSTORE_FILENAME,
        mimeType: 'text/plain'
    };

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