let fsImpl;

export function setFsImpl(impl) {
    if (fsImpl)
        throw new Error('File system implementation already set');

    fsImpl = impl;
}

function getFsImpl() {
    if (!fsImpl)
        throw new Error('No file system implementation');

    return fsImpl;
}

export function fileList() {
    return getFsImpl().fileList();
}

export function download(fileId) {
    return getFsImpl().download(fileId);
}

export function upload({ fileId, fileName, body }) {
    return getFsImpl().upload({ fileId, fileName, body });
}

export function validateFileName(fileName) {
    return getFsImpl().validateFileName(fileName);
}

export function remove(fileId) {
    return getFsImpl().remove(fileId);
}