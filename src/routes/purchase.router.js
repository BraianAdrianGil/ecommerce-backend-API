const {
  getAll,
  create,
  remove,
} = require("../controllers/purchase.controllers");
const express = require("express");
const verifyJWT = require("../utils/verifyJWT.JS");

const purchaseRouter = express.Router();

purchaseRouter.route("/").get(verifyJWT, getAll).post(verifyJWT, create);

purchaseRouter.route("/:id").delete(verifyJWT, remove);

module.exports = purchaseRouter;
