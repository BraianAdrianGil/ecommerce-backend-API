const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Purchase = sequelize.define("purchase", {
  quantity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  //productId => relation index.js
  //userId => relation index.js
});

module.exports = Purchase;
