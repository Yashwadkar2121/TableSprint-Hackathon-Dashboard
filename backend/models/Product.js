const db = require("../db");

exports.create = (name, categoryName, subCategoryName, image, callback) => {
  const query =
    "INSERT INTO products (name, category_name, sub_category_name, image) VALUES (?, ?, ?, ?)";
  db.query(query, [name, categoryName, subCategoryName, image], callback);
};

exports.getAll = (callback) => {
  const query = "SELECT * FROM products";
  db.query(query, callback);
};
