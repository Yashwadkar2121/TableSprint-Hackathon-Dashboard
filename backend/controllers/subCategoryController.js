const SubCategory = require("../models/SubCategory");
const Category = require("../models/Category");

// Create a new SubCategory
exports.createSubCategory = (req, res) => {
  const { subCategoryName, categoryId, image, status, sequence } = req.body;

  // Check if the provided categoryId exists in the Category table
  Category.findById(categoryId, (err, category) => {
    if (err)
      return res.status(500).json({ message: "Server error", error: err });
    if (!category)
      return res.status(400).json({ message: "Invalid category ID" });

    // If the categoryId is valid, create the SubCategory
    SubCategory.create(
      subCategoryName,
      categoryId,
      image,
      status,
      sequence,
      (err, result) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Error creating subcategory", error: err });
        res
          .status(201)
          .json({
            message: "SubCategory created successfully",
            data: result.insertId,
          });
      }
    );
  });
};

// Get all SubCategories
exports.getAllSubCategories = (req, res) => {
  SubCategory.findAll((err, results) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error retrieving subcategories", error: err });
    res.status(200).json(results);
  });
};

// Get a SubCategory by ID
exports.getSubCategoryById = (req, res) => {
  const { id } = req.params;
  SubCategory.findById(id, (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error retrieving subcategory", error: err });
    if (!result.length)
      return res.status(404).json({ message: "SubCategory not found" });
    res.status(200).json(result[0]);
  });
};

// Update a SubCategory
exports.updateSubCategory = (req, res) => {
  const { id } = req.params;
  const { subCategoryName, categoryId, image, status, sequence } = req.body;

  // Check if the provided categoryId exists in the Category table
  Category.findById(categoryId, (err, category) => {
    if (err)
      return res.status(500).json({ message: "Server error", error: err });
    if (!category)
      return res.status(400).json({ message: "Invalid category ID" });

    // If the categoryId is valid, update the SubCategory
    SubCategory.update(
      id,
      subCategoryName,
      categoryId,
      image,
      status,
      sequence,
      (err, result) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Error updating subcategory", error: err });
        if (result.affectedRows === 0)
          return res.status(404).json({ message: "SubCategory not found" });
        res.status(200).json({ message: "SubCategory updated successfully" });
      }
    );
  });
};

// Delete a SubCategory
exports.deleteSubCategory = (req, res) => {
  const { id } = req.params;
  SubCategory.delete(id, (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error deleting subcategory", error: err });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "SubCategory not found" });
    res.status(200).json({ message: "SubCategory deleted successfully" });
  });
};
