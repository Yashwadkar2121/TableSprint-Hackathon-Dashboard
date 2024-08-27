const Product = require("../models/Product");
const SubCategory = require("../models/SubCategory");

// Create a new Product
exports.createProduct = (req, res) => {
  const { productName, subCategoryId, status } = req.body;

  // Check if the provided subCategoryId exists in the SubCategory table
  SubCategory.findById(subCategoryId, (err, subCategory) => {
    if (err)
      return res.status(500).json({ message: "Server error", error: err });
    if (!subCategory.length)
      return res.status(400).json({ message: "Invalid SubCategory ID" });

    // If the subCategoryId is valid, create the Product
    Product.create(productName, subCategoryId, status, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error creating product", error: err });
      res.status(201).json({
        message: "Product created successfully",
        data: result.insertId,
      });
    });
  });
};

// Get all Products
exports.getAllProducts = (req, res) => {
  Product.findAll((err, results) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error retrieving products", error: err });
    res.status(200).json(results);
  });
};

// Get a Product by ID
exports.getProductById = (req, res) => {
  const { id } = req.params;
  Product.findById(id, (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error retrieving product", error: err });
    if (!result.length)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json(result[0]);
  });
};

// Update a Product
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { productName, subCategoryId, status } = req.body;

  // Check if the provided subCategoryId exists in the SubCategory table
  SubCategory.findById(subCategoryId, (err, subCategory) => {
    if (err)
      return res.status(500).json({ message: "Server error", error: err });
    if (!subCategory.length)
      return res.status(400).json({ message: "Invalid SubCategory ID" });

    // If the subCategoryId is valid, update the Product
    Product.update(id, productName, subCategoryId, status, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error updating product", error: err });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Product not found" });
      res.status(200).json({ message: "Product updated successfully" });
    });
  });
};

// Delete a Product
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  Product.delete(id, (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error deleting product", error: err });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  });
};
