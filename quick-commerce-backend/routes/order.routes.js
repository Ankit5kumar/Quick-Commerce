import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/role.middleware.js";

const router = express.Router();

// User routes
router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);

// Admin routes
router.get("/", protect, adminOnly, getAllOrders);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

export default router;
