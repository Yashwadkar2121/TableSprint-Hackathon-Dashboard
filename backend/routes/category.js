const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post(
  "/create",
  upload.single("image"),
  categoryController.createCategory
);
router.get("/", categoryController.getAllCategories);
// router.get("/:id", categoryController.getCategoryById);
// router.put("/update/:id", categoryController.updateCategory);
// router.delete("/delete/:id", categoryController.deleteCategory);

module.exports = router;
