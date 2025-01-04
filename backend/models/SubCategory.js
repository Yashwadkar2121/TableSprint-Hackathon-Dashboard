const db = require("../db");

exports.create = (name, categoryName, image, sequence, callback) => {
  const query =
    "INSERT INTO subcategories (name, category_name, image, sequence) VALUES (?, ?, ?, ?)";
  db.query(query, [name, categoryName, image, sequence], callback);
};

exports.findAll = (callback) => {
  const query = "SELECT * FROM subcategories";
  db.query(query, callback);
};
