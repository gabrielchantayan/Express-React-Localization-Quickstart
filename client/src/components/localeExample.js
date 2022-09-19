import { useState, useEffect } from 'react';
import { getLocale, readLocale } from '../assets/js/locale.js';

export default function LocaleExample(params){
    


    const [locale, setLocale] = useState({})


    useEffect(() => { 
        getLocale()
        .then(res => setLocale(res));
    });

    
    return (
        <section id="localeExample">


            <h2>{readLocale(locale, 'helloWorld')}</h2>
            <hr></hr>

            <p>
                The current language is {readLocale(locale, 'name')}. <br />
                {readLocale(locale, 'testText')} <br />
                The next text is fallback text. {readLocale(locale, 'fallbackTest')} <br />
                The next text shouldn't exist, and should return the string name. {readLocale(locale, 'thisTextDoesNotExist')}
            </p>

        </section>
    )
    

    
}