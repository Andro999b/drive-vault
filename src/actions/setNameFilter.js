import {get as db} from '../db';

export default (name) => () => {
    db().setFilterName(name);
};
