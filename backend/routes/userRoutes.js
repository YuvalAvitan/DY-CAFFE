import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import {
  authUsers,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
router.route("/").post(registerUser).get(protect, isAdmin, getUsers);
router.post("/signin", authUsers);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUserById)
  .put(protect, updateUser);

export default router;
