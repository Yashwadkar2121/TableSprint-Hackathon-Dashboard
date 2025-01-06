const { Product, Category, Subcategory } = require("../models");

// Create a Product
exports.createProduct = async (req, res) => {
  try {
    const { product_name, category_id, subcategory_id, status, image } =
      req.body;

    // Check if Category and Subcategory exist
    const category = await Category.findByPk(category_id);
    const subcategory = await Subcategory.findByPk(subcategory_id);

    if (!category || !subcategory) {
      return res
        .status(404)
        .json({ message: "Category or Subcategory not found" });
    }

    const product = await Product.create({
      product_name,
      category_id,
      subcategory_id,
      status,
      image,
    });

    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category, attributes: ["category_name"] },
        { model: Subcategory, attributes: ["subcategory_name"] },
      ],
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a Product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_name, category_id, subcategory_id, status, image } =
      req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.update({
      product_name,
      category_id,
      subcategory_id,
      status,
      image,
    });

    res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.destroy();
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
