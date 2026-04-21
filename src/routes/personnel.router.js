"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
//Url : personnels =>

const {
  list,
  create,
  read,
  update,
  dlt,
} = require("../controllers/personnel.controller");


router.route("/").get( list).post( create);

router
  .route("/:id")
  .get( read)
  .put( update)
  .delete( dlt);

/* ------------------------------------------------------- */
module.exports = router;
