const app = require("../app");
const request = require("supertest");
const Product = require("../models/Product");
const User = require("../models/User");
require("../models/index");

let token;
let id;

// BEFORE ALL ================================
beforeAll(async () => {
  const res = await request(app).post("/users/login").send({
    email: "testuser@gmail.com",
    password: "test",
  });

  token = res.body.token;
});
// AFTER ALL ================================
afterAll(async () => {
  const user = await User.findOne({ where: { email: "testuser@gmail.com" } });
  await user.destroy();
});
// GET
test("GET /cart should bring all cartProducts ", async () => {
  const res = await request(app)
    .get("/cart")
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});
// CREATE ================================
test("POST /cart should create a cartProduct", async () => {
  const product = await Product.create({
    title: "title test",
    description: "description test",
    price: "price test",
    brand: "brand test",
    categoryId: 1,
  });

  const user = await User.findOne({ where: { email: "testuser@gmail.com" } });

  const cartProduct = {
    quantity: 5,
    userId: user.id,
    productId: product.id,
  };

  const res = await request(app)
    .post("/cart")
    .send(cartProduct)
    .set("Authorization", `Bearer ${token}`);

  id = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.quantity).toBe(cartProduct.quantity);
  expect(res.body.id).toBeDefined();

  await product.destroy();
});
// UPDATE ================================
test("PUT /cart/:id should update the cartProduct", async () => {
  const updatedCartProduct = {
    quantity: 8,
  };

  const res = await request(app)
    .put(`/cart/${id}`)
    .send(updatedCartProduct)
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body.quantity).toBe(updatedCartProduct.quantity);
});
// DELETE ================================
test("DELETE /cart/:id should remove the cartProduct ", async () => {
  const res = await request(app)
    .delete(`/cart/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
