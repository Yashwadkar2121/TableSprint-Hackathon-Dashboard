const express = require("express");
const router = express.Router();
const subcategoryController = require("../controllers/subCategoryController");
const upload = require("../middlewares/upload");

router.post(
  "/",
  upload.single("image"),
  subcategoryController.createSubcategory
);
router.get("/", subcategoryController.getSubcategories);
router.put(
  "/:id",
  upload.single("image"),
  subcategoryController.updateSubcategory
);
router.delete("/:id", subcategoryController.deleteSubcategory);
router.get("/:id", subcategoryController.getSubcategoryById);

module.exports = router;
