const express = require("express");

const {
  createContact,
  getContacts,
  getSingleContact,
  toggleReadStatus,
  deleteContact,
} = require("../controllers/contactController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  admin,
} = require("../middleware/adminMiddleware");

const router = express.Router();

// User
router.post("/", createContact);

// Admin
router.get("/", protect, admin, getContacts);

router.get("/:id", protect, admin, getSingleContact);

router.put("/:id/status", protect, admin, toggleReadStatus);

router.delete("/:id", protect, admin, deleteContact);

module.exports = router;