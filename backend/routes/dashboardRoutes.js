const express = require("express");

const {
  getDashboardStats,
  getRecentOrders,
  getLowStockProducts,
  getOrderStatusStats,
} = require(
  "../controllers/dashboardController"
);

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  admin,
} = require("../middleware/adminMiddleware");

const router = express.Router();

router.get(
  "/stats",
  protect,
  admin,
  getDashboardStats
);
router.get("/recent-orders",protect, admin, getRecentOrders);
router.get("/low-stock",protect, admin, getLowStockProducts);
router.get("/order-status", protect, admin, getOrderStatusStats);
module.exports = router;