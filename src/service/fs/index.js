import * as driveFs from '../google/drive';

const fs = driveFs;

export function fileList() {
    return fs.fileList();
}

export function download(fileId) {
    return fs.download(fileId);
}

export function upload({fileId, fileName, body}) {
    return fs.upload({fileId, fileName, body});
}

export function validateFileName(fileName) {
    return fs.validateFileName(fileName);
}