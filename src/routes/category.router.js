const {
  getAll,
  getOne,
  create,
  update,
  remove,
} = require("../controllers/category.controllers");
const express = require("express");
const verifyJWT = require("../utils/verifyJWT.JS");

const categoryRouter = express.Router();

categoryRouter.route("/").get(getAll).post(verifyJWT, create);

categoryRouter
  .route("/:id")
  .get(getOne)
  .put(verifyJWT, update)
  .delete(verifyJWT, remove);

module.exports = categoryRouter;
