import axios from "axios";

let host = window.location.hostname 
let protocol = window.location.protocol 
let port = ':3080'

// Base API call
const baseURL = `${protocol}//${host}${port}/api/`

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'


// API get function
const get = (call) => {
    const request = axios.get(`${baseURL}${call.join('/')}`);
    return request.then(response => response.data.data);
}


export { get }