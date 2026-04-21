"use strict";
const CustomError = require("../helpers/customError");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const tokenModel = require("../models/token.model");
/* -------------------------------------------------------------------------- */
/*                     EXPRESS - Personnel API                  */
/* -------------------------------------------------------------------------- */
const Token = require("../models/token.model");
const mongoose = require("mongoose");
module.exports = {
  list: async (req, res) => {
        // _swagger.deprecated = true
        // #swagger.ignore = true
    const result = await res.getModelList(Token);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Token),
      result,
    });
  },
  create: async (req, res) => {
        // #swagger.ignore = true

    const user = await Token.create(req.body);

    res.status(201).send({
      error: false,
      user,
    });
  },
  read: async (req, res) => {
    // #swagger.ignore = true
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).send({
        error: true,
        message: "Invalid ID format",
      });
    }
    const result = await Token.findOne({ _id: req.params.id });
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
    // #swagger.ignore = true
  const result = await Token.findByIdAndUpdate(req.params.id, req.body, {
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
    // #swagger.ignore = true
    const result = await Token.deleteOne({ _id: req.params.id });
    if (result.deletedCount) {
      res.sendStatus(204);
    } else {
      res.errorStatusCode = 404;
      throw new Error("Data is not found and not deleted");
    }
  },
};
