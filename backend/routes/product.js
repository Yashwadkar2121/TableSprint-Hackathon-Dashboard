const express = require("express");
const multer = require("multer");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = multer({ dest: "uploads/" });

router.post("/create", upload.single("image"), productController.createProduct);

router.get("/", productController.getAllProducts);

// // Route to get a single Product by ID
// router.get("/:id", productController.getProductById);

// // Route to update a Product by ID
// router.put("/update/:id", productController.updateProduct);

// // Route to delete a Product by ID
// router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
