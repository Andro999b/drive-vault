import AES  from 'crypto-js/aes';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Utf8 from 'crypto-js/enc-utf8';

export function createSecret(password, salt) {
    if(!password)
        throw new Error('Password must by not empty or null');

    return HmacSHA256(password, salt).toString();
}

export function decrypt(cipher, secret) {
    return AES.decrypt(cipher, secret).toString(Utf8);
}

export function encrypt(keystore, secret) {
    return AES.encrypt(keystore, secret).toString();
}