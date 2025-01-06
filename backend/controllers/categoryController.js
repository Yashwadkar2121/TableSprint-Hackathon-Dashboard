const { Category, Subcategory, Product } = require("../models");

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { category_name, image, status, sequence } = req.body;
    const newCategory = await Category.create({
      category_name,
      image,
      status,
      sequence,
    });
    res
      .status(201)
      .json({ message: "Category created successfully", data: newCategory });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating category", error: error.message });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: { model: Subcategory, include: Product },
    });
    res
      .status(200)
      .json({ message: "Categories fetched successfully", data: categories });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching categories", error: error.message });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name, image, status, sequence } = req.body;
    const category = await Category.findByPk(id);

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    await category.update({ category_name, image, status, sequence });
    res
      .status(200)
      .json({ message: "Category updated successfully", data: category });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating category", error: error.message });
  }
};

// Delete a category and its related subcategories and products
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    await category.destroy();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting category", error: error.message });
  }
};
