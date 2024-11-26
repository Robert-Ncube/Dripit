import express from "express";
import {
  addAddress,
  deleteAddress,
  getAddresses,
  updateAddress,
} from "../controllers/AddressController.js";

const router = express.Router();

router.get("/all/:userId", getAddresses);
router.post("/add", addAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);
router.put("/update/:userId/:addressId", updateAddress);

export default router;
