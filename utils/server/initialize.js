import * as logger from '../misc/logger.js'

import { copyFile, readFile, writeFile, mkdir, readdir } from 'fs/promises';    // Filesystem promises
import { readdirSync, statSync } from 'fs';                                     // For logging file tree
import fixFallbackMessages from '../locale/fixFallbackMessages.js';



//// 
//// Initialization
////
async function initialize(){
    console.log("Initializing server...");

    await locales()

    console.log("Finished initializing.")
}


async function locales() {
    logger.logInit('Initializing locales')
    const locales = await readdir('locales/originals');
    logger.logInit(`Found the following locales: [${locales.join('] [')}]`)
    for (let locale in locales){
        logger.logInit(`Fixing ${locales[locale]}`)
        let fixedLocale = await fixFallbackMessages(locales[locale])

        writeFile(`locales/${locales[locale]}`, JSON.stringify(fixedLocale), 'utf8')
    }
}


export default initialize