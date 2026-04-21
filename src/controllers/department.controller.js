"use strict";

/* -------------------------------------------------------------------------- */
/*                     EXPRESS - Personnel API                  */
/* -------------------------------------------------------------------------- */
const Department = require("../models/department.model");
const Personnel = require("../models/personnel.model");
const mongoose = require("mongoose");
module.exports = {
  list: async (req, res) => {
    const result = await res.getModelList(Department);
    console.log("istek geldi");
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Department),
      result,
    });
  },
  create: async (req, res) => {
    const result = await Department.create(req.body);

    res.status(201).send({
      error: false,
      result,
    });
  },
  read: async (req, res) => {
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
    const result = await Department.deleteOne({ _id: req.params.id });
    if (result.deletedCount) {
      res.sendStatus(204);
    } else {
      res.errorStatusCode = 404;
      throw new Error("Data is not found and not deleted");
    }
  },
  personnels: async (req, res) => {
    // const result = await Personnel.find({ _id: req.params.id });

    const customFilter = { departmentId: req.params.id };
   
    const result = await res.getModelList(Personnel, customFilter, "departmentId");
    res.send({
      error: false,
      details: await res.getModelListDetails(Personnel, customFilter),
      result,
    });
  },
};
