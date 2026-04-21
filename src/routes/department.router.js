"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
const {
  isLogin,
  isAdmin,
  isAdminOrLead,
} = require("../middlewares/permissions");

const {
  list,
  create,
  read,
  update,
  dlt,
  personnels
} = require("../controllers/department.controller");
// URL :/departments

router.route("/").get(isLogin, list).post(isAdmin,create);

router.route("/:id").get(read).put(isAdmin,update).delete(isAdmin,dlt);

router.route("/:id/personnels").get(isAdminOrLead, personnels);

/* ------------------------------------------------------- */
module.exports = router;
