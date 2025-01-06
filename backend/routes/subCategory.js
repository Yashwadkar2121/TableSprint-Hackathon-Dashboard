const express = require("express");
const router = express.Router();
const subcategoryController = require("../controllers/subCategoryController");

// Create Subcategory
router.post("/", subcategoryController.createSubcategory);

// Get All Subcategories
router.get("/", subcategoryController.getSubcategories);

// Update Subcategory
router.put("/:id", subcategoryController.updateSubcategory);

// Delete Subcategory
router.delete("/:id", subcategoryController.deleteSubcategory);

module.exports = router;
