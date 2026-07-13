const Wishlist = require("../models/wishlistModel");

const addToWishlist = async (req, res) => {
  try {
    const { product } = req.body;

    const existingItem =
      await Wishlist.findOne({
        user: req.user._id,
        product,
      });

    if (existingItem) {
      return res.status(400).json({
        success: false,
        message:
          "Product Already In Wishlist",
      });
    }

    const wishlistItem =
      await Wishlist.create({
        user: req.user._id,
        product,
      });

    res.status(201).json({
      success: true,
      message: "Added To Wishlist",
      wishlistItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getWishlist = async (req, res) => {
  try {
    const wishlistItems = await Wishlist.find({
      user: req.user._id,
    }).populate("product");

    res.status(200).json({
      success: true,
      count: wishlistItems.length,
      wishlistItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const removeWishlistItem = async (
  req,
  res
) => {
  try {
    const wishlistItem =
      await Wishlist.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!wishlistItem) {
      return res.status(404).json({
        success: false,
        message: "Wishlist Item Not Found",
      });
    }

    await wishlistItem.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Removed From Wishlist",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  addToWishlist,
  getWishlist,
  removeWishlistItem,
};