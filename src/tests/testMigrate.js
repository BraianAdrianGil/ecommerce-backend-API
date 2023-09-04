const sequelize = require("../utils/connection");
const request = require("supertest");
const app = require("../app");

const main = async () => {
  try {
    // Acciones a ejecutar antes de los tests
    sequelize.sync();

    const user = {
      firstName: "test",
      lastName: "user",
      email: "testuser@gmail.com",
      password: "test",
      phone: "0123456789",
    };
    await request(app).post("/users").send(user);

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

main();
