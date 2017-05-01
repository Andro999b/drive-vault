/* global cryptico */

export function getPasswordRSAKey(password, salt, bits = 1024) {
    if(!password)
        throw new Error('Password must by not empty or null');

    return cryptico.generateRSAKey(password + salt, bits);
}

export function decrypt(cipher, rsaKey) {
    const result = cryptico.decrypt(cipher, rsaKey);

    if(result.status == 'success')
        return result.plaintext;

    throw new Error('Fail to decrypt keystore: ', cipher, result);
}

export function encrypt(keystore, rsaKey) {
    return cryptico.encript(keystore, cryptico.publicKeyString(rsaKey));
}