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
    secret: process.env.SECRET_KEY,
  }),
);

// Cors

const cors = require("cors");
app.use(cors());
/* -----------------------Middlewares-------------------------------- */

//queryHandler
app.use(require("./src/middlewares/findSearchSortPage"));

//Authentication
app.use(require("./src/middlewares/authentication"));

//Logger
app.use(require("./src/middlewares/logger"));
/* --------------------------------- Routes --------------------------------- */

//Documentation
//Json

app.use('/documents/json',(req,res)=>{
  res.sendFile('swagger.json',{root:'.'})
})
//Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJson = require("./swagger.json");
app.use(
  "/documents/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJson, {
    swaggerOptions: { persistAuthorization: true },
  }),
);

//Redoc
const redoc = require("redoc-express");
app.use("/documents/redoc" , redoc({specUrl:'/documents/json',title:'Redoc UI'}));

//HOME PATH
app.all("/", (req, res) => {
  res.status(200).send({
    error: false,
    message: "welcome to personnel API",
    session: req.session,
  });
});

//departments
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
