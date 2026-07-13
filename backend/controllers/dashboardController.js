const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");

const getDashboardStats = async (req, res) => {
  try {
        

    const totalUsers = await User.countDocuments();

    const totalProducts =
      await Product.countDocuments();

    const totalOrders =
      await Order.countDocuments();

    const orders = await Order.find({
      orderStatus: {$ne: "Cancelled"},
    });
    



    const totalRevenue = orders.reduce(
      (acc, order) =>
        acc + order.totalAmount,
      0
    );

    res.status(200).json({
      success: true,
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getRecentOrders = async (req, res) => {
  try {
    const recentOrders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      count: recentOrders.length,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getLowStockProducts = async (
  req,
  res
) => {
  try {
    const products =
      await Product.find().select("name images sizes");

    const lowStockProducts =
      products.filter((product) =>
        product.sizes.some(
          (size) => size.stock <= 5
        )
      );

    res.status(200).json({
      success: true,
      count:
        lowStockProducts.length,
      lowStockProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getOrderStatusStats = async (
  req,
  res
) => {
  try {
    const pending = await Order.countDocuments({
      orderStatus: "Pending",
    });

    const processing =
      await Order.countDocuments({
        orderStatus: "Processing",
      });

    const shipped =
      await Order.countDocuments({
        orderStatus: "Shipped",
      });

    const delivered =
      await Order.countDocuments({
        orderStatus: "Delivered",
      });

    const cancelled =
      await Order.countDocuments({
        orderStatus: "Cancelled",
      });

    res.status(200).json({
      success: true,
      pending,
      processing,
      shipped,
      delivered,
      cancelled,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  getDashboardStats,
  getRecentOrders,
  getLowStockProducts,
  getOrderStatusStats,
};