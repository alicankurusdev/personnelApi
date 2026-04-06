"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const express = require("express");
const app = express();

// Nested Query
app.set("query parser", "extended");

require("dotenv").config();
const PORT = process.env?.PORT || 8000;

const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- */
// Accept JSON:
app.use(express.json());

//Cookie-session
app.use(
  require("cookie-session")({
    secret: process.env.SECRET_KEY
  }),
);

/* -----------------------Middlewares-------------------------------- */
app.use(require('./src/middlewares/findSearchSortPage'))

/* --------------------------------- Routes --------------------------------- */

//HOME PATH
app.all("/", (req, res) => {
  res.status(200).send({
    error: false,
    message: "welcome to personnel API",
    session: req.session,
  });
});

//deparments
app.use("/departments", require("./src/routes/department.router"));
//personnels
app.use("/personnels", require("./src/routes/personnel.router"));
//auth
app.use("/auth", require("./src/routes/auth.router"));
//tokens
app.use("/tokens", require("./src/routes/token.router"));

/* -------------------------------------------------------------------------- */
// ErrorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
//! Syncronization (must be in commentLine):
// require('./src/helpers/sync')()
