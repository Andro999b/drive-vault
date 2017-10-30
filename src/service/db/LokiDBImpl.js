import Loki from 'lokijs';
import uuidV4 from 'uuid/v4';

const CREDENTIALS_COLLECTION = 'credentials';
const CREDENTIALS_COLLECTION_VIEW = CREDENTIALS_COLLECTION + 'View';
const GROUPS_COLLECTION = 'groups';
const GROUPS_COLLECTION_VIEW = GROUPS_COLLECTION + 'View';
const DEFAULT_DB_OPTIONS = {
    autoload: true,
    autosave: true,
    autosaveInterval: 2000,
    verbose: true
};

class LokiDBPersistanceAdapter {
    constructor(keystore, onDatabaseSave) {
        this.keystore = keystore;
        this.onDatabaseSave = onDatabaseSave;
    }

    // eslint-disable-next-line no-unused-vars
    loadDatabase(dbname, callback) {
        callback(this.keystore);
    }

    // eslint-disable-next-line no-unused-vars
    saveDatabase(dbname, dbstring, callback) {
        this.keystore = dbstring;
        this.onDatabaseSave(dbstring, () => callback(null));
    }

    // eslint-disable-next-line no-unused-vars
    deleteDatabase(dbname, callback) {
        this.onDatabaseSave = null;
        this.keystore = null;
        callback();
    }
}

class LokiDBImpl {
    constructor(keystore, {
        onGoupsUpdated,
        onCredentialsUpdated,
        onDatabaseSave,
        onDatabaseInited,
        onDatabaseChanged
    }) {
        this.onDatabaseChanged = onDatabaseChanged;
        this.onGoupsUpdated = onGoupsUpdated;
        this.onCredentialsUpdated = onCredentialsUpdated;
        this.onDatabaseSave = onDatabaseSave;

        this.db = new Loki('keystoredb', {
            ...DEFAULT_DB_OPTIONS,
            adapter: new LokiDBPersistanceAdapter(keystore, onDatabaseSave),
            autoloadCallback: () => {
                this.initDatabase(this.db);
                onDatabaseInited(this);
            },
        });
    }

    initDatabase(db) {
        //ensure db srtucture
        this.credentialsCollection = db.getCollection(CREDENTIALS_COLLECTION);
        this.groupsCollection = db.getCollection(GROUPS_COLLECTION);

        if (this.credentialsCollection == null) {
            this.credentialsCollection = db.addCollection(CREDENTIALS_COLLECTION);
            this.credentialsCollection.ensureIndex('id');
            this.credentialsCollection.ensureIndex('group');
        }

        if (this.groupsCollection == null) {
            this.groupsCollection = db.addCollection(GROUPS_COLLECTION);
            this.groupsCollection.ensureIndex('id');
        }

        this.credentialsView = this.credentialsCollection.getDynamicView(CREDENTIALS_COLLECTION_VIEW);
        if (this.credentialsView == null) {
            this.credentialsView = this.credentialsCollection.addDynamicView(CREDENTIALS_COLLECTION_VIEW, { persistent: false });
        }

        this.groupsView = this.groupsCollection.getDynamicView(GROUPS_COLLECTION_VIEW);
        if (this.groupsView == null) {
            this.groupsView = this.groupsCollection.addDynamicView(GROUPS_COLLECTION_VIEW, { persistent: false });
        }

        this.credentialsView.removeFilters();

        //init listenres
        this.initViewsListeners();
    }

    initViewsListeners() {
        const db = this.db;

        const credentialsView = db.getCollection(CREDENTIALS_COLLECTION).getDynamicView(CREDENTIALS_COLLECTION_VIEW);
        const groupsView = db.getCollection(GROUPS_COLLECTION).getDynamicView(GROUPS_COLLECTION_VIEW);

        credentialsView.on('rebuild', (view) => this.onCredentialsUpdated(view.data()));
        groupsView.on('rebuild', (view) => this.onGoupsUpdated(view.data()));

        this.onCredentialsUpdated(credentialsView.data());
        this.onGoupsUpdated(groupsView.data());
    }

    saveCredential(credential) {
        if (credential.id) {
            this.credentialsCollection.update(credential);
        } else {
            credential.id = uuidV4();
            this.credentialsCollection.insert(credential);
        }
        this.onDatabaseChanged();
    }

    removeCredential(credential) {
        this.credentialsCollection.findAndRemove({ id: credential.id });
        this.onDatabaseChanged();
    }

    saveGroup(group) {
        if (group.id) {
            this.groupsCollection.update(group);
        } else {
            group.id = uuidV4();
            this.groupsCollection.insert(group);
        }
        this.onDatabaseChanged();
    }

    removeGroup(group) {
        this.groupsCollection.findAndRemove({ id: group.id });
        this.credentialsCollection.findAndUpdate({ id: group.id }, (credential) => {
            const index = credential.groups.findIndex((item) => item.id == group.id);
            if (index > -1) credential.groups.splice(index, 1);
        });
        this.onDatabaseChanged();
    }

    setFilterGroup(group) {
        if (group)
            this.credentialsView.applyFind({ groups: { '$contains': group.id } }, 'group');
        else
            this.removeFilter('group');
    }

    setFilterName(name) {
        if (name)
            this.credentialsView.applyFind({ name: { $regex: name } }, 'name');
        else
            this.removeFilter('name');
    }

    removeFilter(uid) {
        try {
            this.credentialsView.removeFilter(uid);
        } catch (e) {
            //dont care
        }
    }

    getGroup(id) {
        return this.groupsCollection.findOne({ id });
    }

    getCredential(id) {
        return this.credentialsCollection.findOne({ id });
    }

    saveDatabase() {
        this.db.saveDatabase();
    }

    serialize() {
        return this.db.serialize();
    }

    deserialize(keystore) {
        this.onDatabaseChanged();
        return new Promise((resolve) => {
            const oldDb = this.db;
            //clean up old db
            oldDb.deleteDatabase(() => {
                oldDb.removeCollection(CREDENTIALS_COLLECTION);
                oldDb.removeCollection(GROUPS_COLLECTION);

                //create new db
                this.db = new Loki('keystoredb', {
                    ...DEFAULT_DB_OPTIONS,
                    adapter: new LokiDBPersistanceAdapter(keystore, this.onDatabaseSave),
                    autoloadCallback: () => {
                        this.initDatabase(this.db);
                        this.db.saveDatabase(() => {
                            resolve();
                        });
                    }
                });
            });
        });
    }
}

export default LokiDBImpl;