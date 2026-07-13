const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  createAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} = require("../controllers/addressController");

const router = express.Router();

router.post("/", protect, createAddress);
router.get("/", protect, getAddresses);
router.put("/:id", protect, updateAddress);
router.delete("/:id", protect, deleteAddress);
module.exports = router;