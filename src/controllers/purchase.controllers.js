const catchError = require("../utils/catchError");
const Purchase = require("../models/Purchase");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Image = require("../models/Image");

const getAll = catchError(async (req, res) => {
  const user = req.user;
  const purchases = await Purchase.findAll({
    include: [{ model: Product, include: { model: Image } }],
    where: { userId: user.id },
  });
  return res.json(purchases);
});

const create = catchError(async (req, res) => {
  const user = req.user;
  const cart = await Cart.findAll({
    where: { userId: user.id },
    attributes: ["quantity", "productId", "userId"],
    raw: true, //aca le ponemos raw porque el bulkCreate modifica como trae el json
  });
  //   const createPurchases = cart.map((cartProduct) =>
  //     Purchase.create({
  //       productId: cartProduct.productId,
  //       quantity: cartProduct.quantity,
  //       userId: cartProduct.userId,
  //     })
  //   );
  //   const purchases = await Promise.all(createPurchases);
  const purchases = await Purchase.bulkCreate(cart);
  await Cart.destroy({ where: { userId: user.id } }); // Limpiamos todo el carro del usuario al hacer el purchase
  return res.status(201).json(purchases);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Purchase.destroy({ where: { id } });
  return res.sendStatus(204);
});

module.exports = {
  getAll,
  create,
  remove,
};
