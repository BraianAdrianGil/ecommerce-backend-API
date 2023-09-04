const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Cart = sequelize.define(
  "cart",
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    //userId => relation in index.js
    //productId => relation in index.js
  },
  {
    timestamps: false,
  }
);

module.exports = Cart;
