const Brand = require("../models/brandModel");

// CREATE BRAND
const createBrand = async (req, res) => {
  try {
    const { name } = req.body;

    const brandExists = await Brand.findOne({
      name,
    });

    if (brandExists) {
      return res.status(400).json({
        success: false,
        message: "Brand already exists",
      });
    }

    const brand = await Brand.create({
      name,
    });

    res.status(201).json({
      success: true,
      message: "Brand Created Successfully",
      brand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET BRANDS
const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();

    res.status(200).json({
      success: true,
      count: brands.length,
      brands,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE BRAND
const updateBrand = async (req, res) => {
  try {
    const brand =
      await Brand.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Brand Updated Successfully",
      brand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE BRAND
const deleteBrand = async (req, res) => {
  try {
    const brand =
      await Brand.findByIdAndDelete(
        req.params.id
      );

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Brand Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
};