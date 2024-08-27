const db = require("../db");

const SubCategory = {
  create: (subCategoryName, categoryId, image, status, sequence, callback) => {
    const query =
      "INSERT INTO sub_categories (subCategoryName, categoryId, image, status, sequence) VALUES (?, ?, ?, ?, ?)";
    db.query(
      query,
      [subCategoryName, categoryId, image, status, sequence],
      callback
    );
  },

  findAll: (callback) => {
    const query = `SELECT sc.id, sc.subCategoryName, c.name AS categoryName, sc.image, sc.status, sc.sequence 
                   FROM sub_categories sc 
                   JOIN categories c ON sc.categoryId = c.id`;
    db.query(query, callback);
  },

  findById: (id, callback) => {
    const query = `SELECT sc.id, sc.subCategoryName, c.name AS categoryName, sc.image, sc.status, sc.sequence 
                   FROM sub_categories sc 
                   JOIN categories c ON sc.categoryId = c.id
                   WHERE sc.id = ?`;
    db.query(query, [id], callback);
  },

  update: (
    id,
    subCategoryName,
    categoryId,
    image,
    status,
    sequence,
    callback
  ) => {
    const query =
      "UPDATE sub_categories SET subCategoryName = ?, categoryId = ?, image = ?, status = ?, sequence = ? WHERE id = ?";
    db.query(
      query,
      [subCategoryName, categoryId, image, status, sequence, id],
      callback
    );
  },

  delete: (id, callback) => {
    const query = "DELETE FROM sub_categories WHERE id = ?";
    db.query(query, [id], callback);
  },
};

module.exports = SubCategory;
