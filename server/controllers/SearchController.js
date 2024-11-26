import Product from "../models/ProductModel.js";

export const searchProduct = async (req, res) => {
  try {
    const { keyword } = req.params;

    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        error: "Invalid keyword!",
      });
    }

    const regex = new RegExp(keyword, "i");

    const createSearchQuery = {
      $or: [
        { title: regex },
        { description: regex },
        { category: regex },
        { brand: regex },
      ],
    };

    const products = await Product.find(createSearchQuery);

    if (!products.length) {
      return res.status(404).json({
        success: false,
        error: "No products found!",
      });
    }

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Server error!",
    });
  }
};
