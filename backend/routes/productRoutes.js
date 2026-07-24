const express = require("express");
const { createProduct,
    getProducts,
      getBestSellerProducts,
      getLatestProducts, 
    getOfferProducts,
    getSearchSuggestions,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    addReview,
    updateReview,
    deleteReview,
    toggleProductStatus,
 } = require("../controllers/productController");
 const { protect } = require("../middleware/authMiddleware");
 const { admin } = require("../middleware/adminMiddleware");



const router = express.Router();

router.post("/", protect, admin, createProduct);
router.get("/", getProducts);
router.get(
  "/suggestions",
  getSearchSuggestions
);
router.get("/offers", getOfferProducts);
router.get("/best-sellers", getBestSellerProducts);
router.get("/latest", getLatestProducts);
router.get("/:id", getSingleProduct);
router.put(
  "/:id",
  protect,
  admin,
  updateProduct
);
router.delete("/:id", protect, admin, deleteProduct);
router.post(
  "/:id/reviews",
  protect,
  addReview
);
router.put(
  "/:id/reviews",
  protect,
  updateReview
);
router.delete(
  "/:id/reviews",
  protect,
  deleteReview
);
router.put(
  "/:id/status",
  protect,
  admin,
  toggleProductStatus
);

module.exports = router;