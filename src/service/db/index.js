import LokiDBImpl from './LokiDBImpl';

let db;

export function init(keystore, callbacks) {
    if (db != null)
        throw new Error('db already inited');

    return new Promise(function(resolve) {
        db = new LokiDBImpl(keystore, {...callbacks, onDbInited: resolve});
    });
}

export function get() {
    if (db == null)
        throw new Error('db not inited');

    return db;
}

export function save() {
    if (db == null)
        throw new Error('db not inited');

    db.saveDatabase();
}
