const catchError = require("../utils/catchError");
const Category = require("../models/Category");

const getAll = catchError(async (req, res) => {
  const category = await Category.findAll();
  return res.json(category);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);
  if (!category) return res.sendStatus(404);
  return res.json(category);
});

const create = catchError(async (req, res) => {
  const category = await Category.create(req.body, {
    exclude: ["createdAt", "updatedAt"],
  });
  return res.status(201).json(category);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const category = await Category.update(req.body, {
    where: { id },
    returning: true,
  });
  if (category[0] === 0) return res.sendStatus(404);
  return res.json(category[1][0]);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Category.destroy({ where: { id } });
  return res.sendStatus(204);
});

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
