export default () => (dispath, getState) => 
    gapi.client.drive.files.list({
        q: `name = '${KEYSTORE_FILENAME}'`,
        fields: 'files(id,webContentLink)'
    }).then((res) => {
        const files = res.result.files;

        if(files.length > 0)
            return download(files[0].id).then((data) => {
                const encryptData = getState().encryptData;
                dispath(setEncryptedData({...encryptData, data}));
            });

        return Promise.resolve(dispath(setEncryptedData({...encryptData, data: null})));
    });