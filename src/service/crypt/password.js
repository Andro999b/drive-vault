export const isWeakPassword = (password) => {
    
    //Atleast eight characters
    if(password.length < 8) return true;
    //Uppercase characters of European languages (A through Z, with diacritic marks, Greek and Cyrillic characters)
    if(!/[A-Z]+/.test(password)) return true;
    //Lowercase characters of European languages (a through z, sharp-s, with diacritic marks, Greek and Cyrillic characters)
    if(!/[a-z]+/.test(password)) return true;
    //Base 10 digits (0 through 9)
    if(!/[0-9]+/.test(password)) return true;
    //Nonalphanumeric characters: ~!@#$%^&*_-+=`|\(){}[]:;"'<>,.?/
    if(!/[~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/]+/.test(password)) return true;

    return false;
};