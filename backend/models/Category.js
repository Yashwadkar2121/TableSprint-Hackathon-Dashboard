const db = require("../db");

const Category = {
  create: (name, image, status, sequence, callback) => {
    const query =
      "INSERT INTO categories (name, image, status, sequence) VALUES (?, ?, ?, ?)";
    db.query(query, [name, image, status, sequence], callback);
  },

  findAll: (callback) => {
    const query = "SELECT * FROM categories";
    db.query(query, callback);
  },

  findById: (id, callback) => {
    const query = "SELECT * FROM categories WHERE id = ?";
    db.query(query, [id], callback);
  },

  update: (id, name, image, status, sequence, callback) => {
    const query =
      "UPDATE categories SET name = ?, image = ?, status = ?, sequence = ? WHERE id = ?";
    db.query(query, [name, image, status, sequence, id], callback);
  },

  delete: (id, callback) => {
    const query = "DELETE FROM categories WHERE id = ?";
    db.query(query, [id], callback);
  },
};

module.exports = Category;
