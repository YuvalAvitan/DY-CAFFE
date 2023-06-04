import express from "express";
const router = express.Router();
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import {
  getCategories,
  addCategory,
  deleteCategory,
} from "../controllers/categoriesController.js";

router.route("/").get(getCategories).post(protect, isAdmin, addCategory);
router.route("/:id").delete(protect, isAdmin, deleteCategory);

export default router;
