const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

const addToCart = async (req, res) => {
  try {
    const user = req.user._id;

    const { product, size, quantity } = req.body;

    const productData = await Product.findById(product);

    if (!productData) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    const selectedSize = productData.sizes.find(
      (item) => item.size === Number(size)
    );

    if (!selectedSize) {
      return res.status(400).json({
        success: false,
        message: "Size Not Available",
      });
    }

    if (selectedSize.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${selectedSize.stock} items available`,
      });
    }

    const existingCartItem = await Cart.findOne({
      user,
      product,
      size,
    });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;

      await existingCartItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart Updated Successfully",
        cartItem: existingCartItem,
      });
    }

    const cartItem = await Cart.create({
      user,
      product,
      size,
      quantity,
    });

    res.status(201).json({
      success: true,
      message: "Product Added To Cart",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find({
  user: req.user._id,
})
  .populate("user", "-password")
  .populate("product");

let totalAmount = 0;

cartItems.forEach((item) => {
  if (item.product) {
    totalAmount += item.product.discountPrice * item.quantity;
  }
});

res.status(200).json({
  success: true,
  count: cartItems.length,
  totalAmount,
  cartItems,
});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart Item Not Found",
      });
    }

    cartItem.quantity = req.body.quantity;

    await cartItem.save();

    res.status(200).json({
      success: true,
      message: "Cart Updated Successfully",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart Item Not Found",
      });
    }

    await cartItem.deleteOne();

    res.status(200).json({
      success: true,
      message: "Item Removed From Cart",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  addToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem,
};