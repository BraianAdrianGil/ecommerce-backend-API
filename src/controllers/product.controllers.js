const catchError = require("../utils/catchError");
const { Op } = require("sequelize");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Image = require("../models/Image");

const getAll = catchError(async (req, res) => {
  const { title, category } = req.query; //Parámetros de búsqueda

  const filters = {};

  if (title) {
    filters[Op.or] = [];

    filters[Op.or].push({
      title: {
        [Op.iLike]: `%${title}%`,
      },
    });

    filters[Op.or].push({
      brand: {
        [Op.iLike]: `%${title}%`,
      },
    });
  }
  if (category) {
    filters.categoryId = category;
  }
  const results = await Product.findAll({
    include: [Category, Image],
    where: filters,
  });

  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await Product.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Product.findByPk(id, {
    include: [Category, Image],
  });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Product.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Product.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const setProductImages = catchError(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  await product.setImages(req.body);
  const images = await product.getImages();
  return res.json(images);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setProductImages,
};