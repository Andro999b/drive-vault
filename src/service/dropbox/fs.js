import { getClient } from './client';
import { readFile } from 'service/utils';

const idToPath = (id) => 'id:' + id; 
const extractFileId = (path) => path.substring(3);

// eslint-disable-next-line
export function validateFileName(fileName) {
    return Promise.resolve({ valid: true });
}

// eslint-disable-next-line
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

// eslint-disable-next-line
export function download(fileId) {
    return getClient()
        .filesDownload({ path: idToPath(fileId)})
        .then((result) => readFile(result.fileBlob));
}

// eslint-disable-next-line
export function upload({ fileId, fileName, body }) {
    return getClient()
        .filesUpload({
            contents: body,
            path: fileId? idToPath(fileId) : '/' + fileName + '.vault',
            mode: {
                '.tag': 'overwrite'
            }
        })
        .then((file) => ({id: extractFileId(file.id)}));
}