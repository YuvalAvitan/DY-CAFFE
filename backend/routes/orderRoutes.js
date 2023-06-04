import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  updateOrderToPaid1,
  deleteOrder,
} from "../controllers/orderController.js";
import { protect, isBarista } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, isBarista, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(getOrderById).delete(protect, deleteOrder);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, isBarista, updateOrderToDelivered);
router.route("/:id/paid").put(protect, updateOrderToPaid1);

export default router;
