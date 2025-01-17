const { Category, Subcategory } = require("../models");
const path = require("path");

// Create Subcategory
exports.createSubcategory = async (req, res) => {
  try {
    const { category_id, subcategory_name, status, sequence } = req.body;

    // Get uploaded file path
    const imagePath = req.file ? req.file.path.replace("uploads\\", "") : null; // Normalize slashes for compatibility

    // Check if the category exists
    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Create subcategory
    const subcategory = await Subcategory.create({
      category_id,
      subcategory_name,
      image: imagePath,
      status: status || "active",
      sequence,
    });

    res
      .status(201)
      .json({ message: "SubCategory created successfully", data: subcategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Subcategories
exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.findAll({
      include: [{ model: Category, attributes: ["category_name"] }],
    });
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Subcategory
exports.updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params; // Extract the subcategory ID from the URL params
    const updates = req.body; // Extract the updates from the request body

    // Fetch the subcategory by ID
    const subcategory = await Subcategory.findByPk(id);
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    // Handle file upload if an image is included
    if (req.file) {
      const imagePath = req.file.path.replace("uploads\\", ""); // Normalize file path slashes
      updates.image = imagePath; // Add the image path to updates
    }

    // Update the subcategory
    await subcategory.update(updates);

    // Send a success response
    res.status(200).json({
      message: "Subcategory updated successfully",
      data: subcategory,
    });
  } catch (error) {
    console.error("Error updating subcategory:", error);
    res.status(500).json({
      message: "Failed to update subcategory",
    });
  }
};


// Delete Subcategory
exports.deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subcategory = await Subcategory.findByPk(id);
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    await subcategory.destroy();
    res.status(200).json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getSubcategoryById = async (req, res) => {
  try {
    const { id } = req.params; // Extract subcategory ID from request parameters

    // Fetch subcategory by ID along with associated category
    const subcategory = await Subcategory.findOne({
      where: { id },
      include: {
        model: Category,
        as: "Category", // Adjust the alias if needed
        attributes: ["category_name"], // Choose the category data you want to include
      },
    });

    // Check if the subcategory exists
    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    // Send the subcategory data
    res.status(200).json({
      success: true,
      data: subcategory,
    });
  } catch (error) {
    console.error("Error fetching subcategory by ID:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
exports.serveImages = (req, res) => {
  const filePath = path.join(__dirname, "../uploads", req.params.filename);
  res.sendFile(filePath);
};
