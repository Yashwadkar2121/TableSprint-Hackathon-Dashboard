const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const upload = require("../middlewares/upload");

router.post("/", upload.single("image"), categoryController.createCategory);
router.get("/", upload.single("image"), categoryController.getCategories); // Get all categories
router.put("/:id", upload.single("image"), categoryController.updateCategory); // Update category
router.delete("/:id", categoryController.deleteCategory); // Delete category
router.get("/:id", categoryController.getCategoryById);

module.exports = router;
