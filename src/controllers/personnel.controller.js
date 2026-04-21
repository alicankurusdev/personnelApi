"use strict";

/* -------------------------------------------------------------------------- */
/*                     EXPRESS - Personnel API                  */
/* -------------------------------------------------------------------------- */

const Personnel = require("../models/personnel.model");
const mongoose = require("mongoose");
const Token = require("../models/token.model");
const passwordEncrypt = require("../helpers/passwordEncrypt");
module.exports = {
  list: async (req, res) => {
    console.log("object");
    const result = await res.getModelList(Personnel);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Personnel),
      result,
    });
  },
  create: async (req, res) => {
    const user = await Personnel.create(req.body);

    //TOKEN
    //Token Check
    let token = await Token
      .findOne({ userId: user.id })
      .select("token -_id")
      .lean();
    //Token Create
    if (!token) {
      token = await Token.create({
        token: passwordEncrypt(user.id),
        userId: user.id,
      });
    }
    res.status(201).send({
      error: false,
      user,
      token:token.token,
    });
  },
  read: async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).send({
        error: true,
        message: "Invalid ID format",
      });
    }
    const result = await Personnel.findOne({ _id: req.params.id });
    if (!result) {
      res.errorStatusCode = 400;
      throw new Error("Data is not found");
    }
    res.status(200).send({
      error: false,
      result,
    });
  },
  update: async (req, res) => {
    const result = await Personnel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!result) {
      res.errorStatusCode = 400;
      throw new Error("Data is not found");
    }
    res.status(200).send({
      error: false,
      result,
    });
  },
  dlt: async (req, res) => {
    const result = await Personnel.deleteOne({ _id: req.params.id });
    if (result.deletedCount) {
      res.sendStatus(204);
    } else {
      res.errorStatusCode = 404;
      throw new Error("Data is not found and not deleted");
    }
  },
};
