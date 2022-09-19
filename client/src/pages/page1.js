import React from "react";
import LocaleExample from "../components/localeExample";

export default function Page1(params){
    

    return (
        <div>
            <h1>Page 1</h1>

            <LocaleExample />

            <a href="/page2">Page 2</a>
        </div>
    )
}