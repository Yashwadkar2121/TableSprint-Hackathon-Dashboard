const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = require("./user")(sequelize, Sequelize);
const Category = require("./category")(sequelize, Sequelize);
const Subcategory = require("./subcategory")(sequelize, Sequelize);
const Product = require("./product")(sequelize, Sequelize);

// Relationships
Category.hasMany(Subcategory, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});
Subcategory.belongsTo(Category, { foreignKey: "category_id" });

Subcategory.hasMany(Product, {
  foreignKey: "subcategory_id",
  onDelete: "CASCADE",
});
Product.belongsTo(Subcategory, { foreignKey: "subcategory_id" });

module.exports = { sequelize, User, Category, Subcategory, Product };
