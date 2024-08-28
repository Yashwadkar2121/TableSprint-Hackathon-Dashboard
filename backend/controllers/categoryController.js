const Category = require("../models/Category");

exports.createCategory = (req, res) => {
  const { name, sequence } = req.body;
  const image = req.file ? req.file.path : null;

  Category.create(name, image, sequence, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Category created successfully" });
  });
};

exports.getAllCategories = (req, res) => {
  Category.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};
