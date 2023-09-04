const Product = require("./Product");
const Category = require("./Category");
const Image = require("./Image");
const Cart = require("./Cart");
const User = require("./User");
const Purchase = require("./Purchase");

Product.belongsTo(Category);
Category.hasMany(Product);

Image.belongsTo(Product);
Product.hasMany(Image);

User.hasMany(Cart);
Cart.belongsTo(User);
Product.hasMany(Cart);
Cart.belongsTo(Product);

Product.hasMany(Purchase);
Purchase.belongsTo(Product);
User.hasMany(Purchase);
Purchase.belongsTo(User);
