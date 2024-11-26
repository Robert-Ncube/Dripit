import express from "express";
import { searchProduct } from "../controllers/SearchController.js";

const router = express.Router();

router.get("/search/:keyword", searchProduct);

export default router;
