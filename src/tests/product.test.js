const app = require("../app");
const Image = require("../models/Image");
const User = require("../models/User");
const request = require("supertest");
require("../models/index");

let id;
let token;
// BEFORE ALL =================================================
// We are logging an user because of the protected endpoints. We need the token for some request.
// This user is created at testMigrate.js file and called here through beforeAll to do the login.
beforeAll(async () => {
  const res = await request(app).post("/users/login").send({
    email: "testuser@gmail.com",
    password: "test",
  });
  token = res.body.token;
});
// AFTER ALL ==================================================
afterAll(async () => {
  const user = await User.findOne({ where: { email: "testuser@gmail.com" } });
  await user.destroy();
});

// GET ALL ====================================================
test("GET /products should bring all products", async () => {
  const res = await request(app).get("/products");
  expect(res.status).toBe(200);
});
// CREATE PRODUCT =============================================
test("POST /products should create a new product", async () => {
  const body = {
    title: "Prueba",
    description: "prueba test",
    price: "850",
    brand: "prueba",
    categoryId: 1,
  };
  const res = await request(app)
    .post("/products")
    .send(body)
    .set("Authorization", `Bearer ${token}`);
  id = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.name).toBe(body.name);
  expect(res.body.id).toBeDefined();
});
// UPDATE PRODUCT =============================================
test("PUT /products/:id should update a product", async () => {
  const body = {
    title: "Prueba actualizada",
  };
  const res = await request(app)
    .put(`/products/${id}`)
    .send(body)
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body.title).toBe(body.title);
});
// SET PRODUCT IMAGES =========================================
test("POST /products/:id/images", async () => {
  const image = await Image.create({
    url: "testImage.com",
    publicId: "testId",
  });

  const res = await request(app)
    .post(`/products/${id}/images`)
    .send([image.id])
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);

  await image.destroy();
});
// DELETE PRODUCT ===============================================
test("DELETE /products/:id should delete a product", async () => {
  const res = await request(app)
    .delete(`/products/${id}`)
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(204);
});
