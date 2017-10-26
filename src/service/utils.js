export function isMobile() {
    if(window.matchMedia) { 
        const isMobile = window.matchMedia('only screen and (max-width: 768px)');
        return isMobile.matches;
    }

    return false;
}