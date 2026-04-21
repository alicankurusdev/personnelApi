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
        /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "List Personnels"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
    console.log("object");
    const result = await res.getModelList(Personnel);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Personnel),
      result,
    });
  },
  create: async (req, res) => {
        /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "Create Personnel"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: '#/definitions/Personnel'
                }
            }
        */
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
        /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "Get Single Personnel"
        */
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
        /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "Update Personnel"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: '#/definitions/Personnel'
                }
            }
        */
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
        /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "Delete Personnel"
        */
    const result = await Personnel.deleteOne({ _id: req.params.id });
    if (result.deletedCount) {
      res.sendStatus(204);
    } else {
      res.errorStatusCode = 404;
      throw new Error("Data is not found and not deleted");
    }
  },
};
