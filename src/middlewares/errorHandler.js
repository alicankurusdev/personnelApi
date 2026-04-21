"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

module.exports = (err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = err.name === "ValidationError" ? 400 : 500;
  }

  return res.status(err.statusCode).send({
    error: true,
    message: err.message,
    cause: err.cause,
    body: req.body,
  });
};
