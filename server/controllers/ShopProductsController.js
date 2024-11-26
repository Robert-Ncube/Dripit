import Product from "../models/ProductModel.js";

export const getProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    // Check if specific categories are provided
    if (category.length > 0 && category !== "products") {
      filters.category = { $in: category.split(",") };
    }

    // Apply brand filters if provided
    if (brand.length > 0) {
      filters.brand = { $in: brand.split(",") };
    }

    // Define sort order
    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      default:
        sort.price = 1;
    }

    console.log("Filters:", filters);
    console.log("Sort:", sort);

    // Query database for products
    const products = await Product.find(filters).sort(sort);

    if (!products.length) {
      return res
        .status(404)
        .json({ success: false, error: "No products found" });
    }

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
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

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
