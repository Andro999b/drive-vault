/* global gapi*/

const EXT = '.vault';

export function validateFileName(fileName) {
    return /[^.]+/.test(fileName);
}

export function fileList() {
    return gapi.client.drive.files.list({
        q: `name contains '${EXT}' and trashed != true`,
        fields: 'files(id,name,webContentLink)'
    }).then((res) => res.result.files);
}

export function download(fileId) {
    return gapi.client.drive.files.get({
        fileId: fileId,
        alt: 'media'
    }).then((res) => res.body);
}

export function upload({fileId, fileName, body}) {

    const request = new XMLHttpRequest();
    const GoogleAuth = gapi.auth2.getAuthInstance();
    const currentUser = GoogleAuth.currentUser.get();
    const authResponse = currentUser.getAuthResponse();

    let requestBody;

    if(fileId == null) {
        const metadata = {
            name: fileName + EXT,
            mimeType: 'text/plain'
        };

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