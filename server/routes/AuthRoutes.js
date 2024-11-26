import express from "express";
import {
  deleteProfile,
  login,
  logout,
  register,
  authMiddleware,
  isAuthenticated,
} from "../controllers/AuthControllers.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.delete("/delete", deleteProfile);
router.get("/check-auth", authMiddleware, isAuthenticated);

export default router;
