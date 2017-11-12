export function isTablet() {
    if(window.matchMedia) { 
        const isMobile = window.matchMedia('only screen and (max-width: 768px)');
        return isMobile.matches;
    }

    return false;
}

export function isMobile() {
    if(window.matchMedia) { 
        const isMobile = window.matchMedia('only screen and (max-width: 570px)');
        return isMobile.matches;
    }

    return false;
}

export function callOnEnter(callback) {
    return function(e) {
        if (e.keyCode == 13) {
            callback();
        }
    };
} 

export function paramsFromUrlHash() {
    return window.location.hash
        .replace(/^#?\//, '')
        .split('&')
        .reduce((o, entry) => {
            if (entry == '') return o;
            entry = entry.split('=');
            o[decodeURIComponent(entry[0])] = decodeURIComponent(entry[1]); return o;
        }, {});
}

export function readFile(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsText(file, 'utf-8');
        fileReader.onerror = reject;
        fileReader.onload = () => resolve(fileReader.result);
    });
}