const Product = require("../models/Product");

exports.createProduct = (req, res) => {
  const { name, categoryName, subCategoryName } = req.body;
  const image = req.file ? req.file.path : null;

  Product.create(name, categoryName, subCategoryName, image, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Product created successfully" });
  });
};

exports.getAllProducts = (req, res) => {
  Product.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};
