const { Category, Subcategory, Product } = require("../models");
const path = require("path");

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { category_name, status, sequence } = req.body;

    // Get uploaded file path
    const imagePath = req.file ? req.file.path.replace("uploads\\", "") : null; // Remove platform-specific slashes for cross-platform compatibility

    const newCategory = await Category.create({
      category_name,
      image: imagePath, // Save the relative file path in the database
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
    const { category_name, status, sequence } = req.body;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Check for image update
    let imagePath = category.image; // Default to the old image
    if (req.file) {
      imagePath = req.file.path.replace("uploads\\", ""); // Handle file upload and save new image path
    }

    // Update the category with the new data
    await category.update({
      category_name,
      image: imagePath, // Update image only if a new file is uploaded
      status,
      sequence,
    });

    res.status(200).json({
      message: "Category updated successfully",
      data: category,
      imagePath,
    });
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

// Fetch category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params; // Extract category ID from request parameters

    // Fetch category by ID
    const category = await Category.findByPk(id);

    // Check if the category exists
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Send the category data
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Static file serving for image uploads
exports.serveImages = (req, res) => {
  const filePath = path.join(__dirname, "../uploads", req.params.filename);
  res.sendFile(filePath);
};
