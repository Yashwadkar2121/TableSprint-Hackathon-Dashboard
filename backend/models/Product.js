const db = require("../db");

const Product = {};

// Create a new Product
Product.create = (productName, subCategoryId, status, callback) => {
  const query =
    "INSERT INTO Products (productName, subCategoryId, status) VALUES (?, ?, ?)";
  db.query(query, [productName, subCategoryId, status], callback);
};

// Find all Products
Product.findAll = (callback) => {
  const query = `
    SELECT p.id, p.productName, sc.subCategoryName, c.categoryName, p.status 
    FROM Products p
    JOIN SubCategories sc ON p.subCategoryId = sc.id
    JOIN Categories c ON sc.categoryId = c.id
  `;
  db.query(query, callback);
};

// Find a Product by ID
Product.findById = (id, callback) => {
  const query = `
    SELECT p.id, p.productName, sc.subCategoryName, c.categoryName, p.status 
    FROM Products p
    JOIN SubCategories sc ON p.subCategoryId = sc.id
    JOIN Categories c ON sc.categoryId = c.id
    WHERE p.id = ?
  `;
  db.query(query, [id], callback);
};

// Update a Product by ID
Product.update = (id, productName, subCategoryId, status, callback) => {
  const query = `
    UPDATE Products 
    SET productName = ?, subCategoryId = ?, status = ?
    WHERE id = ?
  `;
  db.query(query, [productName, subCategoryId, status, id], callback);
};

// Delete a Product by ID
Product.delete = (id, callback) => {
  const query = "DELETE FROM Products WHERE id = ?";
  db.query(query, [id], callback);
};

module.exports = Product;
