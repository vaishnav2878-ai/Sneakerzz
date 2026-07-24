const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Address = require("../models/addressModel");
const Product = require("../models/productModel");

const createOrder = async (req, res) => {
  try {
    const { addressId } = req.body;
    console.log("Address ID:", addressId);
console.log("User ID:", req.user._id);

    const address = await Address.findOne({
      _id: addressId,
      user: req.user._id,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address Not Found",
      });
    }

    const cartItems = await Cart.find({
      user: req.user._id,
    }).populate("product");

    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is Empty",
      });
    }

    let totalAmount = 0;

    const orderItems = cartItems.map((item) => {
      const price =
        item.product.discountPrice > 0
          ? item.product.discountPrice
          : item.product.price;

      totalAmount += price * item.quantity;

      return {
  product: item.product._id,

  productName: item.product.name,

  productImage:
    item.product.images?.[0] || "",

  size: item.size,

  quantity: item.quantity,

  price,
};
    });

    const order = await Order.create({
      user: req.user._id,
      address: address._id,
      orderItems,
      totalAmount,
    });
    for (const item of cartItems) {
  console.log("Cart Item Size:", item.size);

  const product = await Product.findById(
    item.product._id
  );

  const sizeIndex = product.sizes.findIndex(
    (size) => size.size === item.size
  );

  console.log("Size Index:", sizeIndex);

  if (sizeIndex !== -1) {
    product.sizes[sizeIndex].stock -= item.quantity;

    console.log(
      "New Stock:",
      product.sizes[sizeIndex].stock
    );
  }

  await product.save();
}

    await Cart.deleteMany({
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Order Created Successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getMyOrders = async (req, res) => {
  try {
    console.log("Logged User:", req.user._id);

    const orders = await Order.find({
      user: req.user._id,
    })
      .populate("address")
      .populate("orderItems.product");

    console.log("Orders Found:", orders.length);

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("address")
      .populate("orderItems.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    if (
      order.orderStatus === "Shipped" ||
      order.orderStatus === "Delivered"
    ) {
      return res.status(400).json({
        success: false,
        message: "Order Cannot Be Cancelled",
      });
    }

    order.orderStatus = "Cancelled";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order Cancelled Successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
  .populate("user", "name email")
  .populate("address")
  .populate({
    path: "orderItems.product",
    populate: [
      {
        path: "brand",
        select: "name",
      },
      {
        path: "category",
        select: "name",
      },
    ],
  })
  .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }

    order.orderStatus = status;

    // COD Payment Update
    if (status === "Delivered") {
      order.paymentStatus = "Paid";
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order Status Updated Successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createOrder,
  getMyOrders,
  getSingleOrder,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
};