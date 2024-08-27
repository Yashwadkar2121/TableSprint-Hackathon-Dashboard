const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Route to create a new Product
router.post("/create", productController.createProduct);

// Route to get all Products
router.get("/", productController.getAllProducts);

// Route to get a single Product by ID
router.get("/:id", productController.getProductById);

// Route to update a Product by ID
router.put("/update/:id", productController.updateProduct);

// Route to delete a Product by ID
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
