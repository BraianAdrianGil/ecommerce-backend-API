const app = require("../app");
const request = require("supertest");
const User = require("../models/User");

let id;
let token;
// BEFORE ALL ====================================================================
beforeAll(async () => {
  const res = await request(app).post("/users/login").send({
    email: "testuser@gmail.com",
    password: "test",
  });
  token = res.body.token;
});
// AFTER ALL =====================================================================
afterAll(async () => {
  const user = await User.findOne({ where: { email: "testuser@gmail.com" } });
  await user.destroy();
});
// GET  =========================================================================
test("GET /categories should bring all categories", async () => {
  const res = await request(app).get("/categories");

  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});
// CREATE =======================================================================
test("POST /categories should create a new category", async () => {
  const body = {
    name: "Cellphones",
  };

  const res = await request(app)
    .post("/categories")
    .send(body)
    .set("Authorization", `Bearer ${token}`);
  id = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(body.name);
});
// PUT ==========================================================================
test("PUT /categories/:id should update a category", async () => {
  const category = {
    name: "Stoves",
  };
  const res = await request(app)
    .put(`/categories/${id}`)
    .send(category)
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe(category.name);
});
// DELETE =======================================================================
test("DELETE /categories/:id should delete a category", async () => {
  const res = await request(app)
    .delete(`/categories/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
