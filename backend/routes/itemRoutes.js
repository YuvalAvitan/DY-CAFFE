import express from "express";
const router = express.Router();
import {
  getItems,
  getItemById,
  deleteItem,
  createItem,
  updateItem,
  getTopItems,
} from "../controllers/itemController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

router.route("/").get(getItems).post(protect, isAdmin, createItem);

router.get("/top", getTopItems);
router
  .route("/:id")
  .get(getItemById)
  .delete(protect, isAdmin, deleteItem)
  .put(protect, isAdmin, updateItem);

export default router;
