import Loki from 'lokijs';
import uuidV4 from 'uuid/v4';

const CREDENTIALS_COLLECTION = 'credentials';
const CREDENTIALS_COLLECTION_VIEW = CREDENTIALS_COLLECTION + 'View';
const GROUPS_COLLECTION = 'groups';
const GROUPS_COLLECTION_VIEW = GROUPS_COLLECTION + 'View';

class LokiDBPersistanceAdapter {
    constructor(keystore, onDatabaseSave) {
        this.keystore = keystore;
        this.onDatabaseSave = onDatabaseSave;
    }

    // eslint-disable-next-line no-unused-vars
    loadDatabase (dbname, callback) {
        callback(this.keystore);
    }

    // eslint-disable-next-line no-unused-vars
    saveDatabase (dbname, dbstring, callback) {
        this.keystore = dbstring;
        this.onDatabaseSave(dbstring);
        callback(null);
    }
}

class LokiDBImpl {
    constructor(keystore, { onGoupsUpdated, onCredentialsUpdated, onDatabaseSave, onDbInited }) {
        this.db = new Loki('keystoredb', {
            adapter: new LokiDBPersistanceAdapter(keystore, onDatabaseSave),
            autoload: true,
            autoloadCallback: databaseInitialize,
            autosave: true,
            autosaveInterval: 2000
        });

        const self = this;
        function databaseInitialize() {
            self.credentialsCollection = self.db.getCollection(CREDENTIALS_COLLECTION);
            self.groupsCollection = self.db.getCollection(GROUPS_COLLECTION);

            if (self.credentialsCollection == null) {
                self.credentialsCollection = self.db.addCollection(CREDENTIALS_COLLECTION);
                self.credentialsCollection.ensureIndex('id');
                self.credentialsCollection.ensureIndex('group');
            }

            if (self.groupsCollection == null) {
                self.groupsCollection = self.db.addCollection(GROUPS_COLLECTION);
                self.groupsCollection.ensureIndex('id');
            }

            self.credentialsView = self.credentialsCollection.getDynamicView(CREDENTIALS_COLLECTION_VIEW);
            if(self.credentialsView == null) {
                self.credentialsView = self.credentialsCollection.addDynamicView(CREDENTIALS_COLLECTION_VIEW, {persistent: false});
            }

            self.groupsView = self.groupsCollection.getDynamicView(GROUPS_COLLECTION_VIEW);
            if(self.groupsView == null) {
                self.groupsView = self.groupsCollection.addDynamicView(GROUPS_COLLECTION_VIEW, {persistent: false});
            }

            self.credentialsView.on('rebuild', (view) => onCredentialsUpdated(view.data()));
            self.groupsView.on('rebuild', (view) => onGoupsUpdated(view.data()));

            self.credentialsView.removeFilters(); 

            onCredentialsUpdated(self.credentialsView.data());
            onGoupsUpdated(self.groupsView.data());
            onDbInited(self);
        }
    }

    saveCredential(credential) {
        if (credential.id) {
            this.credentialsCollection.update(credential);
        } else {
            credential.id = uuidV4();
            this.credentialsCollection.insert(credential);
        }
    }

    removeCredential(credential) {
        this.credentialsCollection.findAndRemove({ id: credential.id });
    }

    saveGroup(group) {
        if (group.id) {
            this.groupsCollection.update(group);
        } else {
            group.id = uuidV4();
            this.groupsCollection.insert(group);
        }
    }

    removeGroup(group) {
        this.groupsCollection.findAndRemove({ id: group.id });
        this.credentialsCollection.findAndUpdate({ id: group.id }, (credential) => credential.group = null);
    }

    setFilterGroup(group) {
        if (group)
            this.credentialsView.applyFind({ group: group.id }, 'group');
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

    saveDatabase() {
        this.db.saveDatabase();
    }

    getGroup(id) {
        return this.groupsCollection.findOne({id});
    }

    getCredential(id) {
        return this.credentialsCollection.findOne({id});
    }
}

export default LokiDBImpl;