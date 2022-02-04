'use strict';

const path = require('path');

// Import ENV VARS
require('dotenv').config({ path: path.resolve('.env') });

// Import Express
const express = require('express');
const apiApp = express();

// Enable CORS
const cors = require('cors');
apiApp.use(cors());

// Bind the API app to a specified port
apiApp.set('port', process.env.API_PORT||8080);

// Set JSON
apiApp.use(express.json());

// Set morgan
if(process.env.NODE_ENV=='development') {
    const morgan = require('morgan');
    apiApp.use(morgan('dev'));
}

// Set & Rewrite the Routes
const route_base_url = '/api/v1';
apiApp.use(route_base_url, require('./routes/test'));

// Midleware Handler
apiApp.use((err, req,res,next)=>{
    // Return Next when the request has no error
    if(!err) next();
    // Handling Errors
    if(err.name=='SequelizeConnectionRefusedError') {
        res.status(504).json({error: `Database service unavailable`});
    }
    else if(err.name=='SequelizeConnectionError') {
        res.status(504).json({error: `Database access denied`});
    }
    else if(err.name==='SyntaxError') {
        res.status(400).json({error: `${err.name}: Invalid body`});
    }
    else if(err.name==='SequelizeValidationError') {
        let errors=[];
        for(const key in err.errors) errors.push(err.errors[key].message);
        res.status(400).json({errors: errors.join(',')});
    }
    else {
        res.status(500).json({error: `${err.message||err.toString()}`});
    }
    if(process.env.NODE_ENV=='development') {
        console.error(err.message||err.toString());
    }
});

// API app listen for connections
apiApp.listen( apiApp.get('port'), () => {
    if(process.env.NODE_ENV=='development') {
        console.log('✔️ ',`API app listening on port ${apiApp.get('port')}.`)
    }
});


//
// Web App
//
const webApp = express();
// Use the React build as static
webApp.use(express.static(path.resolve('web/build')));
// Bind the Web app to a specified port
webApp.set('port', process.env.WEB_PORT||80);
// Web app listen for connections
webApp.listen(webApp.get('port'), () =>  {
    if(process.env.NODE_ENV=='development') {
        console.log('✔️ ',`Web app listening on port ${webApp.get('port')}.`)
    }
});