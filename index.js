"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
*/

const express = require('express')
const app = express()

// Nested Query
app.set("query parser", "extended");

require("dotenv").config();
const PORT = process.env?.PORT || 8000;

/* ------------------------------------------------------- */
// Accept JSON:
app.use(express.json())


/* ------------------------------------------------------- */





/* ------------------------------------------------------- */
// ErrorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('Running: http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()