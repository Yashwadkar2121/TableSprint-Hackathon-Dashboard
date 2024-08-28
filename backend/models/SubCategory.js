const db = require("../db");

exports.create = (name, categoryName, image, sequence, callback) => {
  const query =
    "INSERT INTO sub_categories (name, category_name, image, sequence) VALUES (?, ?, ?, ?)";
  db.query(query, [name, categoryName, image, sequence], callback);
};

exports.findAll = (callback) => {
  const query = "SELECT * FROM sub_categories";
  db.query(query, callback);
};
