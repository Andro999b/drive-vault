import Lockr from 'lockr';

export const SELECTED_GROUP_KEY = 'selected-group';
export const PINCODE_SECRET_KEY = 'pincode-secret';
export const PINCODE_SALT_KEY = 'pincode-salt';

export const getSetting = (key)  => Lockr.get(key);
export const setSetting = (key, data)  => Lockr.set(key, data);

export const getVaultSetting = (vault, key)  => {
    const settings = getSetting(vault);
    return settings && settings[key];
};

export const setVaultSetting = (vault, key, data)  => {
    const settings = getSetting(vault) || {};
    settings[key] = data;
    setSetting(vault, settings);
};