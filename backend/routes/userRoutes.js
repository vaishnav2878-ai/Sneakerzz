const express = require("express");
const { getProfile,
    getUsers,
    deleteUser,
    toggleUserStatus,
 } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");



const router = express.Router();

router.get("/profile", protect, getProfile);
router.get("/", protect, admin, getUsers);

router.delete("/:id", protect, admin, deleteUser);
router.put(
  "/:id/status",
  protect,
  admin,
  toggleUserStatus
);

module.exports = router;