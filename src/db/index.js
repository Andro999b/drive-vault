import LokiDBImpl from './LokiDBImpl';

let db;

export function init(keystore, callbacks) {
    if (db != null)
        throw new Error('db already inited');

    db = new LokiDBImpl(keystore, callbacks);

    return db;
}

export function get() {
    if (db == null)
        throw new Error('db not inited');

    return db;
}

