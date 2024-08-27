const express = require("express");
const router = express.Router();
const subCategoryController = require("../controllers/subCategoryController");

router.post("/create", subCategoryController.createSubCategory);
router.get("/", subCategoryController.getAllSubCategories);
router.get("/:id", subCategoryController.getSubCategoryById);
router.put("/update/:id", subCategoryController.updateSubCategory);
router.delete("/delete/:id", subCategoryController.deleteSubCategory);

module.exports = router;
