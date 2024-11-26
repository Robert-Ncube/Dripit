import express from "express";
import { upload } from "../helpers/cloudinary.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
  handleImageUpload,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductsController.js";

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", createProduct);
router.get("/all", getAllProducts);
router.get("/:id", getProductById);
router.put("/edit/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
