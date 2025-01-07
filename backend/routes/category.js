const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.post("/", categoryController.createCategory); // Create category
router.get("/", categoryController.getCategories); // Get all categories
router.put("/:id", categoryController.updateCategory); // Update category
router.delete("/:id", categoryController.deleteCategory); // Delete category
router.get("/:id", categoryController.getCategoryById);

module.exports = router;
