const path = require("path");
const { Product, Subcategory } = require("../models"); // Assuming the models are imported

exports.createProduct = async (req, res) => {
  try {
    const { subcategory_id, product_name, status } = req.body;

    // Validate required fields
    if (!subcategory_id || !product_name || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Get uploaded file path
    // Get uploaded file path
    const imagePath = req.file ? req.file.path.replace("uploads\\", "") : null; // Safer cross-platform file path handling

    // Check if Subcategory exists
    const subcategory = await Subcategory.findByPk(subcategory_id);
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    // Create Product
    const product = await Product.create({
      subcategory_id,
      product_name,
      status,
      image: imagePath,
    });

    res
      .status(201)
      .json({ message: "Product created successfully", data: product });
  } catch (error) {
    console.error(error); // Helpful for debugging
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Subcategory, attributes: ["subcategory_name", "category_id"] },
      ],
    });

    res
      .status(200)
      .json({ message: "Products fetched successfully", products });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

// Update a Product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_name, subcategory_id, status } = req.body;

    // Check if product exists
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Handle file upload: If a new file is uploaded, update the image path
    let imagePath = product.image; // Default to existing image
    if (req.file) {
      // Get the new image path from the uploaded file
      imagePath = req.file.path.replace("uploads\\", ""); // Safer cross-platform file path handling
    }

    // Update product details
    await product.update({
      product_name,
      subcategory_id,
      status,
      image: imagePath,
    });

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error(error); // Helpful for debugging
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};

// Delete a Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};
// Get a Product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find product by primary key
    const product = await Product.findByPk(id, {
      include: [
        {
          model: Subcategory,
          attributes: ["subcategory_name", "category_id"],
        },
      ],
    });

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product fetched successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
};
exports.serveImages = (req, res) => {
  const filePath = path.join(__dirname, "../uploads", req.params.filename);
  res.sendFile(filePath);
};
