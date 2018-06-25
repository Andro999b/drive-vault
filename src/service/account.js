let accountImpl;

export function setAccountImpl(impl) {
    if (accountImpl)
        throw new Error('Account implementation already set');

        accountImpl = impl;
}

function getAccountImpl() {
    if (!accountImpl)
        throw new Error('No Account implementation');

    return accountImpl;
}

export function getUserId() {
    return getAccountImpl().getUserId();
}