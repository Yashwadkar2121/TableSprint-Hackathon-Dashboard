const SubCategory = require("../models/SubCategory");

exports.createSubCategory = (req, res) => {
  const { name, categoryName, sequence } = req.body;
  const image = req.file ? req.file.path : null;

  SubCategory.create(name, categoryName, image, sequence, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Sub-category created successfully" });
  });
};

exports.getAllSubCategories = (req, res) => {
  SubCategory.findAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};
