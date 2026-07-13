const express = require("express");
const { addToCart,
    getCartItems,
    updateCartItem,
    deleteCartItem,

 } = require("../controllers/cartController");
 const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/", protect, getCartItems);
router.put("/:id",protect, updateCartItem);
router.delete("/:id", protect, deleteCartItem);

module.exports = router;