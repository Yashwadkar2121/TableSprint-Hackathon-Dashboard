const express = require("express");
const multer = require("multer");
const router = express.Router();
const subCategoryController = require("../controllers/subCategoryController");

const upload = multer({ dest: "uploads/" });

router.post(
  "/create",
  upload.single("image"),
  subCategoryController.createSubCategory
);
router.get("/", subCategoryController.getAllSubCategories);
// router.get("/:id", subCategoryController.getSubCategoryById);
// router.put("/update/:id", subCategoryController.updateSubCategory);
// router.delete("/delete/:id", subCategoryController.deleteSubCategory);

module.exports = router;
