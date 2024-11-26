import express from "express";
import {
  getProductById,
  getProducts,
} from "../controllers/ShopProductsController.js";

const router = express.Router();

router.get("/all", getProducts);
router.get("/:id", getProductById);

export default router;
