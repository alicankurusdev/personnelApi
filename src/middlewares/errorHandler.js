"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// app.use(errorHandler):

module.exports = (err, req, res, next) => {
    
    return res.status(err.statusCode ).send({
        error: true,
        message: err.message,
        cause: err.cause,
        body: req.body
    });
    
}