import AES  from 'crypto-js/aes';
import PBKDF2 from 'crypto-js/pbkdf2';
import Utf8 from 'crypto-js/enc-utf8';

export function createSecret(password, salt) {
    if(!password)
        throw new Error('Password must by not empty or null');

    return PBKDF2(password, salt, { keySize: 256/32 }).toString();
}

export function decrypt(cipher, secret) {
    return AES.decrypt(cipher, secret).toString(Utf8);
}

export function encrypt(keystore, secret) {
    return AES.encrypt(keystore, secret).toString();
}