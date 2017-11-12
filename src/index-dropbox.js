import dropbox from 'dropbox';

const CLIENT_ID = '8zndpg2utacop6a';

dropbox.authenticate(CLIENT_ID).then(() => console.log('test'));