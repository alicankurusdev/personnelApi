"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

//Authentication Middleware

const Token = require("../models/token.model");

module.exports = async (req, res, next) => {
  req.user = null;
  const auth = req.headers?.authorization || null;

  const tokenArray = auth ? auth.split(" ") : null;

  if (tokenArray && tokenArray[0] == "Token") {
    const tokenData = await Token.findOne({ token: tokenArray[1] }).populate(
      "userId",
    );

    if (tokenData) req.user = tokenData.userId;
  }
  next();
};