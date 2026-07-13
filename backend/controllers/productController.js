const Product = require("../models/productModel");
const Brand = require("../models/brandModel");
const Category = require("../models/categoryModel");

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const query = {
      status: true,
    };

    if (req.query.search) {
      const keyword = req.query.search.trim();

      const brands = await Brand.find({
        name: {
          $regex: keyword,
          $options: "i",
        },
      });

      const categories = await Category.find({
        name: {
          $regex: keyword,
          $options: "i",
        },
      });

      query.$or = [
        {
          name: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          gender: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          brand: {
            $in: brands.map((b) => b._id),
          },
        },
        {
          category: {
            $in: categories.map((c) => c._id),
          },
        },
      ];
    }

    if (req.query.gender) {
      query.gender = req.query.gender;
    }

    if (req.query.featured) {
      query.featured = req.query.featured === "true";
    }

    if (req.query.bestSeller) {
      query.bestSeller = req.query.bestSeller === "true";
    }

    if (req.query.newArrival) {
      query.newArrival = req.query.newArrival === "true";
    }

    const products = await Product.find(query)
      .populate("brand")
      .populate("category");

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getSearchSuggestions = async (req, res) => {
  try {
    const keyword = req.query.search || "";

    if (!keyword.trim()) {
      return res.json({
        success: true,
        products: [],
      });
    }

    const products = await Product.find({
      name: {
        $regex: keyword,
        $options: "i",
      },
      status: true,
    })
      .select("_id name")
      .limit(8);

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("brand")
      .populate("category");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    const alreadyReviewed =
      product.reviews.find(
        (review) =>
          review.user.toString() ===
          req.user._id.toString()
      );

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message:
          "You Already Reviewed This Product",
      });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);

    product.numReviews =
      product.reviews.length;

    product.rating =
      product.reviews.reduce(
        (acc, item) => acc + item.rating,
        0
      ) / product.reviews.length;

    await product.save();

    res.status(201).json({
      success: true,
      message: "Review Added Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    const review = product.reviews.find(
      (review) =>
        review.user.toString() ===
        req.user._id.toString()
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review Not Found",
      });
    }

    review.rating = Number(rating);
    review.comment = comment;

    product.rating =
      product.reviews.reduce(
        (acc, item) => acc + item.rating,
        0
      ) / product.reviews.length;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Review Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteReview = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    product.reviews = product.reviews.filter(
      (review) =>
        review.user.toString() !==
        req.user._id.toString()
    );

    product.numReviews =
      product.reviews.length;

    product.rating =
      product.reviews.length === 0
        ? 0
        : product.reviews.reduce(
            (acc, item) =>
              acc + item.rating,
            0
          ) / product.reviews.length;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Review Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const toggleProductStatus = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    product.status = !product.status;

    await product.save();

    res.status(200).json({
      success: true,
      message: `Product ${
        product.status ? "Activated" : "Deactivated"
      } Successfully`,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createProduct,
  getProducts,
  getSearchSuggestions,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  addReview,
  updateReview,
  deleteReview,
  toggleProductStatus,
};