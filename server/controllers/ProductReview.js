import Review from "../models/Review.js";
import Order from "../models/OrderModel.js";
import Product from "../models/ProductModel.js";

export const addReview = async (req, res) => {
  try {
    const { userId, productId, username, message, ratingValue } = req.body;

    if (!userId || !productId || !username || !message || !ratingValue) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required!" });
    }

    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "confirmed",
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: "User has not placed an order for the specified product!",
      });
    }

    const checkExistingReview = await Review.findOne({
      userId,
      productId,
    });

    if (checkExistingReview) {
      return res.status(400).json({
        success: false,
        error: "User has already reviewed the product!",
      });
    }

    const newReview = new Review({
      userId,
      productId,
      username,
      message,
      ratingValue,
    });

    await newReview.save();

    const reviews = await Review.find({ productId });

    const totalReviewsLength = reviews.length;

    const totalRatingValue =
      reviews.reduce((acc, review) => acc + review.ratingValue, 0) /
      totalReviewsLength;

    await Product.findByIdAndUpdate(productId, {
      averageRating: totalRatingValue,
    });

    res.status(200).json({
      success: true,
      message: "Review added successfully!",
      data: newReview,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

export const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, error: "Product ID is required!" });
    }

    const reviews = await Review.find({ productId });

    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};
