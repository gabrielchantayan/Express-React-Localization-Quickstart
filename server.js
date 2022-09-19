// Prereqs
import express from "express"           // Webserver
import routes from './routes/index.js'  // API Routes
import cors from 'cors'
import initialize from './utils/server/initialize.js';

// Set up on port
const port = process.env.PORT || 80;





// Main function
function main () {

    // Setup express webserver
    const app = express();

    // CORS things
    app.use(cors());
    app.options('*', cors())

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    // Allow webserver to handle JSON files
    app.use(express.json());
    app.use(express.static('public'))
    app.use(express.urlencoded({ extended: true }));


    //
    // 
    // Listen to API routes
    app.use('/api/locale', routes.locale);

    // Open up on port XXXX
    app.listen(port, () => {
        console.log(`Backend live on ${port}`);
    });

}


await initialize();
main();