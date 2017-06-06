import Lockr from 'lockr';

export const SELECTED_GROUP_KEY = 'selected-group';

export const getSetting = (key)  => Lockr.get(key);
export const setSetting = (key, data)  => Lockr.set(key, data);