import express from "express";
import {
  getAdminOrderDetails,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/AdminOrdersController.js";

const router = express.Router();

router.get("/all", getAllOrders);
router.get("/:orderId", getAdminOrderDetails);
router.put("/update/:orderId", updateOrderStatus);

export default router;
