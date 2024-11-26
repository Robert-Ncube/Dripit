import express from "express";
import {
  capturePyment,
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
} from "../controllers/OrderController.js";

const router = express.Router();

router.post("/create", createOrder);
router.post("/capture", capturePyment);
router.get("/all/:userId", getAllOrdersByUser);
router.get("/:orderId", getOrderDetails);

export default router;
