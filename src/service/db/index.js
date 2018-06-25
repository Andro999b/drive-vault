import LokiDBImpl from './LokiDBImpl';

let db;

export function connect(callbacks) {
    if (db != null)
        throw new Error('db already inited');

    db = new LokiDBImpl(callbacks);
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

export function clear() {
    if (db == null)
        throw new Error('db not inited');

    return db.deserialize('');
}

export function save() {
    if (db == null)
        throw new Error('db not inited');

    db.saveDatabase();
}

