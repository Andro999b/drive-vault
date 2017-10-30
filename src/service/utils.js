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