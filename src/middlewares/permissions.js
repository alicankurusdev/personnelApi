"use strict";

/* -------------------------------------------------------
EXPRESS - Personnel API
------------------------------------------------------- */
//permissions middleware
const CustomError = require("../helpers/customError");

module.exports = {
  isLogin: (req, res, next) => {
    if (req.user && req.user.isActive) {
      next();
    } else {
      throw new CustomError(
        "No Permission:You must login and must be an active user",
        403,
      );
    }
  },
  isAdmin: (req, res, next) => {
    if (req.user && req.user.isActive && req.user.isAdmin) {
      next();
    } else {
      throw new CustomError(
        "No Permission:You must login and must be an Admin",
        403,
      );
    }
  },
  isAdminOrLead: (req, res, next) => {
    console.log("PARAM ID:", req.params.id);
    console.log(req.user);
    
    if (
      req.user &&
      (req.user.isAdmin ||
        (req.user.isLead && req.user.departmentId.toString() == req.params.id))
    ) {
      next();
    } else {
      throw new CustomError(
        "No Permission:You must login and must be an Admin or TeamLead",
        403,
      );
    }
  },
};
