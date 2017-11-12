import dropbox from 'dropbox';

export function getUserId() {
    return dropbox('users/get_current_account').then((result) => result.account_id);
}