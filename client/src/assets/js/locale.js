import * as api from './api.js'


async function getLocale(){
    return api.get(['locale', 'getLocale', 'dd'])
}


/**
 * Reads a locale
 * @param {Object} locale 
 * @param {String} text 
 * @returns 
 */
function readLocale(locale, text){
    
    // If the locale is empty return the locale string
    // if (Object.keys(locale).length == 0) return text;

    console.log(locale)

    if (locale.hasOwnProperty(text)) return locale[text];
    else return text;


}


export { getLocale, readLocale }