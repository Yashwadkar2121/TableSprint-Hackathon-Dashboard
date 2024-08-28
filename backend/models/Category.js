const db = require("../db");

exports.create = (name, image, sequence, callback) => {
  const query =
    "INSERT INTO categories (name, image, sequence) VALUES (?, ?, ?)";
  db.query(query, [name, image, sequence], callback);
};

exports.getAll = (callback) => {
  const query = "SELECT * FROM categories";
  db.query(query, callback);
};
