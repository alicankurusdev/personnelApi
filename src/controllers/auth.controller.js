"use strict";
/* -------------------------------------------------------
EXPRESS - Personnel API
------------------------------------------------------- */

const Personnel = require("../models/personnel.model");
const CustomError = require("../helpers/customError");
const Token = require("../models/token.model");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  login: async (req, res) => {
    /*
      #swagger.tags = ['Authentication']
      #swagger.summary = 'Login'
      #swagger.description = 'Login with username/email and password'
      #swagger.parameters ['body'] = {
          in:'body',
          required:true,
          schema:$ref:}
    */
    const { userName, email, password } = req.body;

    if (!(userName || email) && password)
      throw new CustomError("Username or email and password required", 400);

    const user = await Personnel.findOne({
      $or: [{ userName }, { email }],
      password,
    });

    if (!user) throw new CustomError("Wrong email or password", 401);
    // if (!user.isActive)        //!dot forget
    //   throw new CustomError("The user status is not active ", 401);
    //TOKEN
    //Token Check
    let token = await Token.findOne({ userId: user.id });
    //Token Create
    if (!token) {
      token = await Token.create({
        userId: user.id,
        token: passwordEncrypt(user.id),
      });
    }

    res.status(200).send({
      error: false,
      token: token.token,
      user,
    });
  },
  logout: async (req, res) => {
     /*
      #swagger.tags = ['Authentication']
      #swagger.summary = 'Logout'
      #swagger.description = 'Delete Token'
      
    */
    const data = await Token.deleteOne({ userId: req.user._id });

    res.status(200).send({
      error: false,
      message: "Logout success",
    });
  },
};
