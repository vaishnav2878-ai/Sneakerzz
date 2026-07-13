const express = require("express");

const {
  addToWishlist,
  getWishlist,
  removeWishlistItem,
} = require("../controllers/wishlistController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/add",
  protect,
  addToWishlist
);

router.get(
  "/",
  protect,
  getWishlist
);

router.delete(
  "/:id",
  protect,
  removeWishlistItem
);

module.exports = router;