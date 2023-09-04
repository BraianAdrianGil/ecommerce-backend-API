const {
  getAll,
  create,
  getOne,
  remove,
  update,
  getLoggedUser,
  login,
} = require("../controllers/user.controllers");
const express = require("express");
const verifyJWT = require("../utils/verifyJWT.JS");

const userRouter = express.Router();

userRouter.route("/").get(verifyJWT, getAll).post(create);
userRouter.route("/login").post(login);
userRouter.route("/me").get(verifyJWT, getLoggedUser);

userRouter
  .route("/:id")
  .get(verifyJWT, getOne)
  .delete(verifyJWT, remove)
  .put(verifyJWT, update);

module.exports = userRouter;
