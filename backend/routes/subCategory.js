const express = require("express");
const router = express.Router();
const subcategoryController = require("../controllers/subCategoryController");
const upload = require("../middlewares/upload");

// Create Subcategory
router.post(
  "/",
  upload.single("image"),
  subcategoryController.createSubcategory
);

// Get All Subcategories
router.get("/", subcategoryController.getSubcategories);

// Update Subcategory
router.put(
  "/:id",
  upload.single("image"),
  subcategoryController.updateSubcategory
);

// Delete Subcategory
router.delete("/:id", subcategoryController.deleteSubcategory);

//find by id
router.get("/:id", subcategoryController.getSubcategoryById);

module.exports = router;
