import LokiDBImpl from './LokiDBImpl';

let db;

export function init(keystore, callbacks) {
    if (db != null)
        throw new Error('db already inited');

    return new Promise(function (resolve) {
        db = new LokiDBImpl(keystore, { ...callbacks, onDatabaseInited: resolve });
    });
}

export function get() {
    if (db == null)
        throw new Error('db not inited');

    return db;
}

export function serialize() {
    if (db == null)
        throw new Error('db not inited');

    return db.serialize();
}

export function deserialize(keystore) {
    if (db == null)
        throw new Error('db not inited');

    return db.deserialize(keystore);
}

export function save() {
    if (db == null)
        throw new Error('db not inited');

    db.saveDatabase();
}

