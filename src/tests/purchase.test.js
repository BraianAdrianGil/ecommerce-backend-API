const app = require("../app");
const request = require("supertest");
const User = require("../models/User");
const Purchase = require("../models/Purchase");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
require("../models/index");

let token;
let id;

//BEFORE ALL===============================================================
beforeAll(async () => {
  const res = await request(app).post("/users/login").send({
    email: "testuser@gmail.com",
    password: "test",
  });
  token = res.body.token;
});

//AFTER ALL================================================================

//GET =====================================================================
test("GET /purchases should bring all purchases ", async () => {
  const res = await request(app)
    .get("/purchases")
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});
//CREATE ==================================================================
test("POST /purchases should create purchase", async () => {
  const user = await User.findOne({ where: { email: "testuser@gmail.com" } });
  const product = await Product.create({
    title: "test",
    description: "test",
    price: "800.99",
    brand: "test",
    categoryId: 1,
  });
  const cartProduct = await Cart.create({
    quantity: 1,
    userId: user.id,
    productId: product.id,
  });

  const purchase = await Purchase.create({
    quantity: cartProduct.quantity,
    userId: cartProduct.userId,
    productId: cartProduct.productId,
  });

  const res = await request(app)
    .post("/purchases")
    .send([purchase])
    .set("Authorization", `Bearer ${token}`);

  id = purchase.id;

  expect(res.status).toBe(201);
  expect(res.body).toHaveLength(1);
});
//REMOVE ===================================================================
test("DELETE /purchases/:id should delete a purchase", async () => {
  const res = await request(app)
    .delete(`/purchases/${id}`)
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(204);
});
