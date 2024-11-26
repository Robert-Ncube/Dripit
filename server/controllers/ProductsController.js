import { ImageUploadUtil } from "../helpers/cloudinary.js";
import Product from "../models/ProductModel.js";

export const handleImageUpload = async (req, res) => {
  try {
    const result = await ImageUploadUtil(req.file.buffer);
    res.json({ success: true, url: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    if (
      !image ||
      !title ||
      !description ||
      !category ||
      !brand ||
      !price ||
      !salePrice ||
      !totalStock
    ) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields!" });
    }

    // Validate price and sale price fields
    if (price < 0 || salePrice < 0) {
      return res.status(400).json({
        success: false,
        error: "Price and sale price must be positive numbers",
      });
    }

    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    const savedProduct = await newProduct.save();

    res.status(200).json({
      success: true,
      message: "Product created sucessfully.",
      data: savedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    // Check if there are fields to update
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "No fields to update" });
    }

    // Validate price and sale price fields
    if (price < 0 || salePrice < 0) {
      return res.status(400).json({
        success: false,
        error: "Price and sale price must be positive numbers",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};
