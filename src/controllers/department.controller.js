"use strict";

/* -------------------------------------------------------------------------- */
/*                     EXPRESS - Personnel API                  */
/* -------------------------------------------------------------------------- */
const Department = require("../models/department.model");
const Personnel = require("../models/personnel.model");
const mongoose = require("mongoose");
module.exports = {
  list: async (req, res) => {
        /* 
            #swagger.tags = ["Departments"]
            #swagger.summary = "List Departments"
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
    const result = await res.getModelList(Department);
    console.log("istek geldi");
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Department),
      result,
    });
  },
  create: async (req, res) => {
        /*
            #swagger.tags = ["Departments"]
            #swagger.summary = "Create Department"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: '#/definitions/Department'
                }
            }
        */
    const result = await Department.create(req.body);

    res.status(201).send({
      error: false,
      result,
    });
  },
  read: async (req, res) => {
        /*
            #swagger.tags = ["Departments"]
            #swagger.summary = "Get Single Department"
        */
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).send({
        error: true,
        message: "Invalid ID format",
      });
    }
    const result = await Department.findOne({ _id: req.params.id });
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
            #swagger.tags = ["Departments"]
            #swagger.summary = "Update Department"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: '#/definitions/Department'
                }
            }
        */
    const result = await Department.findByIdAndUpdate(req.params.id, req.body, {
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
            #swagger.tags = ["Departments"]
            #swagger.summary = "Delete Department"
        */
    const result = await Department.deleteOne({ _id: req.params.id });
    if (result.deletedCount) {
      res.sendStatus(204);
    } else {
      res.errorStatusCode = 404;
      throw new Error("Data is not found and not deleted");
    }
  },
  personnels: async (req, res) => {
        /*
            #swagger.tags = ["Departments"]
            #swagger.summary = "Get Personnels of Department"
        */

    const customFilter = { departmentId: req.params.id };

    const result = await res.getModelList(
      Personnel,
      customFilter,
      "departmentId",
    );
    res.send({
      error: false,
      details: await res.getModelListDetails(Personnel, customFilter),
      result,
    });
  },
};
