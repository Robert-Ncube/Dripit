import express from "express";
import {
  addToCart,
  fetchCartItems,
  removeFromCart,
  updateCartItemQuantity,
} from "../controllers/CartController.js";

const router = express.Router();

router.get("/get/:userId", fetchCartItems);
router.post("/add", addToCart);
router.put("/update", updateCartItemQuantity);
router.delete("/delete/:userId/:productId", removeFromCart);

export default router;
