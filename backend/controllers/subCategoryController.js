const { Category, Subcategory } = require("../models");

// Create Subcategory
exports.createSubcategory = async (req, res) => {
  try {
    const { category_id, subcategory_name, image, status, sequence } = req.body;

    // Check if the category exists
    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Create subcategory
    const subcategory = await Subcategory.create({
      category_id,
      subcategory_name,
      image,
      status,
      sequence,
    });

    res.status(201).json(subcategory);
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
    const { id } = req.params;
    const updates = req.body;

    const subcategory = await Subcategory.findByPk(id);
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    await subcategory.update(updates);
    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
