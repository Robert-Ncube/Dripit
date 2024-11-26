import express from "express";
import { addReview, getReviews } from "../controllers/ProductReview.js";

const router = express.Router();

router.post("/add", addReview);
router.get("/:productId", getReviews);

export default router;
