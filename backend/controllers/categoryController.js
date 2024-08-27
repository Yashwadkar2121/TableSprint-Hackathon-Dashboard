const Category = require("../models/Category");

exports.createCategory = (req, res) => {
  const { name, image, status, sequence } = req.body;

  Category.create(name, image, status, sequence, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Category created successfully" });
  });
};

exports.getAllCategories = (req, res) => {
  Category.findAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.getCategoryById = (req, res) => {
  const { id } = req.params;

  Category.findById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0)
      return res.status(404).json({ error: "Category not found" });
    res.status(200).json(result[0]);
  });
};

exports.updateCategory = (req, res) => {
  const { id } = req.params;
  const { name, image, status, sequence } = req.body;

  Category.update(id, name, image, status, sequence, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Category updated successfully" });
  });
};

exports.deleteCategory = (req, res) => {
  const { id } = req.params;

  Category.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Category deleted successfully" });
  });
};
