const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createOrder,
getMyOrders,
getSingleOrder,
cancelOrder,
getAllOrders,
updateOrderStatus,
 } = require("../controllers/orderController");
 const { admin } = require("../middleware/adminMiddleware");



const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/:id", protect, getSingleOrder);
router.put("/:id/cancel", protect, cancelOrder);
router.get("/", protect, admin, getAllOrders);
router.put("/:id/status", protect, admin, updateOrderStatus);

module.exports = router;