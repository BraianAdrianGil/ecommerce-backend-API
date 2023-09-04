const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Product = sequelize.define(
  "product",
  {
    title: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING(),
      allowNull: false,
    },

    //categoryId => en el index.js
  },
  {
    timestamps: false,
  }
);

module.exports = Product;
