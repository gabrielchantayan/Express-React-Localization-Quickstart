import {logInit} from '../misc/logger.js'
import * as path from 'path';
import { copyFile, readFile, writeFile, mkdir, readdir } from 'fs/promises';    // Filesystem promises
import { readdirSync, statSync } from 'fs';                                     // For logging file tree
import fixFallbackMessages from '../locale/fixFallbackMessages.js';
import { readJSON, writeJSON } from '../files/json.js';
import 'dotenv/config'  // DotEnv

const doesLogInit       =  true;


// function logInit(text) {
//     if (doesLogInit == true) console.log(`[INIT] ${text}`);
// }

//// 
//// Initialization
////
async function initialize(){
    console.log("[INIT] Initializing server...");

    await locales();

    await config();

    console.log("[INIT] Finished initializing.");
}


// 
// Locales
// 
async function locales() {
    logInit('Initializing locales');

    // Read through the original locale files
    const locales = await readdir('locales/originals');

    // Log the locales found
    logInit(`Found the following locales: [${locales.join('] [')}]`);

    // Iterate through each locale
    for (let locale in locales){
        logInit(`Fixing ${locales[locale]}`);

        // Populate any fallback messages
        let fixedLocale = await fixFallbackMessages(locales[locale])

        // Write the new locale file
        writeFile(`locales/${locales[locale]}`, JSON.stringify(fixedLocale), 'utf8')
    }
}


// 
// Config
// 
async function config() {
    logInit('Generating config files');

    // Read the config file
    let config = await readJSON('config.json');

    let clientConfig = {};

    //// LOCALES
    // Read through the locale files then filter out directories
    let locales = await readdir('locales');
    locales = locales.filter(locale => locale.includes('.json'));

    // Remove the .json from all locales
    for (let i in locales) { locales[i] = locales[i].split('.json')[0]; }

    // Write it into the config
    config['locales'] = locales;


    //// ENVIRONMENT VARIABLES
    const defaultEnvVariables = await readJSON('./tools/environmentVariables.json');
    
    config['environmentVariables'] = {} 

    for (const [variable, data] of Object.entries(defaultEnvVariables)){
        if (data['scope'].includes('server')) config['environmentVariables'][variable] = setDEnv(data, config['environment'])
        if (data['scope'].includes('client')) clientConfig[variable] = setDEnv(data, config['environment'])
    }



    await writeJSON(config, 'config.json')
    await writeJSON(clientConfig, './client/src/config.json')
    
}

function setDEnv(data, env){
    if (data['default'].hasOwnProperty(env)) return data['default'][env];
    else return data['default']['default']
}

export default initialize