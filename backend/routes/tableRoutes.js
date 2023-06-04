import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import {
  getTablesInside,
  getTablesOutside,
  updateUnavailable,
  getTables,
  getTableByID,
  addTable,
  updateTable,
  deleteTable,
} from "../controllers/tableController.js";
import { protect, isBarista } from "../middleware/authMiddleware.js";

router.route("/inside").get(getTablesInside);
router.route("/outside").get(getTablesOutside);
router
  .route("/:id")
  .get(protect, isBarista, getTableByID)
  .put(protect, isBarista, updateTable)
  .delete(protect, isBarista, deleteTable);
router
  .route("/")
  .put(updateUnavailable)
  .get(protect, isBarista, getTables)
  .post(protect, isBarista, addTable);

export default router;
