import React from "react";
import LocalizedString from "../components/localizedString";

export default function Page1(params){
    

    return (
        <div>
            <h1>Page 1</h1>

            <h2>{<LocalizedString string="helloWorld"/>}</h2>
            <hr></hr>

            <p>
                The current language is <LocalizedString string="name"/>. <br />
                <LocalizedString string="testText"/> <br />
                The next text is fallback text. <LocalizedString string="fallbackTest"/> <br />
                The next text shouldn't exist, and should return the string name. <LocalizedString string="thisTextDoesNotExist"/>
            </p>

            <a href="/page2">Page 2</a>
        </div>
    )
}