"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
require('dotenv').config();

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 8000;


const swaggerAutogen = require('swagger-autogen')();

const packageJson = require('./package.json')

const document = {
        info: {
        version: packageJson.version,
        title: packageJson.name,
        description: packageJson.description,
        // termOfService: "http://127.0.0.1:8000/#",
        contact: { name: packageJson.author, email: packageJson.email },
        licence: { name: packageJson.license }
    },

    schemes: ['http', 'https'],
    host: `${HOST}:${PORT}`,
    baseUrl: '/',
    securityDefinitions: {
        Token: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'Simple Token Authentication * Example Use: <b>Token ...tokenKey...</b>'
        }
    },
    security: [{ Token: [] }],

    definitions: {
        'Department': require('./src/models/department.model').schema.obj,
        'Personnel': require('./src/models/personnel.model').schema.obj,
    }

}

swaggerAutogen('./swagger.json', ['./index.js'], document);

//!run thıs file to make a json 
// node swaggerAutogen.js