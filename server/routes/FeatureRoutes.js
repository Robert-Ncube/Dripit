import express from "express";
import {
  addFeatureImage,
  deleteFeatureImage,
  getFeatureImages,
} from "../controllers/FeatureController.js";

const router = express.Router();

router.get("/get", getFeatureImages);
router.post("/add", addFeatureImage);
router.delete("/delete/:id", deleteFeatureImage);

export default router;
