const express = require("express");

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
} = require("../controllers/categoryController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  admin,
} = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", getCategories);

router.post(
  "/",
  protect,
  admin,
  createCategory
);

router.put(
  "/:id",
  protect,
  admin,
  updateCategory
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteCategory
);
router.put(
  "/:id/status",
  protect,
  admin,
  toggleCategoryStatus
);

module.exports = router;