import express from "express";
import AuthRoutes from "./AuthRoutes.js";
import ProductsRoutes from "./ProductsRoutes.js";
import ShopRoutes from "./ShopRoutes.js";
import CartRoutes from "./CartRoutes.js";
import AddressRoutes from "./AddressRoutes.js";
import OrderRoutes from "./OrderRoutes.js";
import AdminOrderRoutes from "./AdminOrderRoutes.js";
import SearchRoutes from "./SearchRoutes.js";
import ReviewRoutes from "./ReviewRoutes.js";
import FeatureRoutes from "./FeatureRoutes.js";

const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/admin/products", ProductsRoutes);
router.use("/admin/orders", AdminOrderRoutes);
router.use("/shop/products", ShopRoutes);
router.use("/shop/cart", CartRoutes);
router.use("/shop/address", AddressRoutes);
router.use("/shop/orders", OrderRoutes);
router.use("/shop/products", SearchRoutes);
router.use("/shop/products/reviews", ReviewRoutes);
router.use("/common/features", FeatureRoutes);

export default router;
