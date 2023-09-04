const app = require("../app");
const request = require("supertest");

let id;
let token;
// CREATE USER ==========================================================
test("POST /users  should create a new user", async () => {
  const body = {
    firstName: "Braian",
    lastName: "test",
    email: "test8@gmail.com",
    password: "test1234",
    phone: "0123456789",
  };
  const res = await request(app).post("/users").send(body);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(body.firstName);
  expect(res.body.id).toBeDefined();
  expect(res.body.password).not.toBe(body.password);
});
// LOGIN USER ==========================================================
test('POST "/users/login should login the user', async () => {
  const body = {
    email: "test8@gmail.com",
    password: "test1234",
  };
  const res = await request(app).post("/users/login").send(body);
  token = res.body.token;
  expect(res.status).toBe(200); //unauthorized
  expect(res.body.token).toBeDefined();
});
// INVALID LOGIN USER ===================================================
test('POST "/users/login should return invalid credentials', async () => {
  const body = {
    email: "incorrect@gmail.com",
    password: "incorrect1234",
  };
  const res = await request(app).post("/users/login").send(body);
  expect(res.status).toBe(401); //unauthorized
});
// GET ALL USERS ========================================================
test("GET /users should bring all users information", async () => {
  const res = await request(app)
    .get("/users")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});
// UPDATE USER ==========================================================
test("PUT /users/:id should update a user", async () => {
  const body = {
    firstName: "BraianUpdated",
  };
  const res = await request(app)
    .put(`/users/${id}`)
    .send(body)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(body.firstName);
});
// DELETE USER ==========================================================
test("DELETE /users/:id should remove a user", async () => {
  const res = await request(app)
    .delete(`/users/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
