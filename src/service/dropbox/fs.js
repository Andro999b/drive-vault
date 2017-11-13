import { getClient } from './client';
import { readFile } from 'service/utils';

const EXT = '.vault';

const idToPath = (id) => 'id:' + id; 
const extractFileId = (path) => path.substring(3);

// eslint-disable-next-line
export function validateFileName(fileName) {
    if(!fileName || /[.]+/.test(fileName)) {
        return Promise.resolve({
            valid: false,
            error: 'Bad file name'
        });
    }

    return getClient()
        .filesSearch({path: '', query: fileName + EXT, mode: 'filename'})
        .then((result) => {
            if(result.matches.length) {
                return Promise.resolve({
                    valid: false,
                    error: 'Valut alredy exist'
                });
            } else {
                return Promise.resolve({valid: true});
            }
        });
}

export function remove(fileId) {
    return getClient().filesDelete({path: idToPath(fileId)});
}

export function fileList() {
    return getClient()
        .filesListFolder({ path: '' })
        .then((result) =>
            result
                .entries
                .filter((obj) => obj['.tag'] == 'file')
                .map((file) => ({
                    id: extractFileId(file.id),
                    name: file.name
                }))
        );
}

export function download(fileId) {
    return getClient()
        .filesDownload({ path: idToPath(fileId)})
        .then((result) => readFile(result.fileBlob));
}

export function upload({ fileId, fileName, body }) {
    return getClient()
        .filesUpload({
            contents: body,
            path: fileId? idToPath(fileId) : '/' + fileName + EXT,
            mode: {
                '.tag': 'overwrite'
            }
        })
        .then((file) => ({id: extractFileId(file.id)}));
}