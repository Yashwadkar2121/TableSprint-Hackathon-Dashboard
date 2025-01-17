const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const upload = require("../middlewares/upload");

router.post("/", upload.single("image"), categoryController.createCategory);
router.get("/", categoryController.getCategories); 
router.put("/:id", upload.single("image"), categoryController.updateCategory); 
router.delete("/:id", categoryController.deleteCategory); 
router.get("/:id", categoryController.getCategoryById);

module.exports = router;
