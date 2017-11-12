import { getClient } from './client';

export function getUserId() {
    return getClient()
            .usersGetCurrentAccount()
            .then((result) => result.account_id);
}