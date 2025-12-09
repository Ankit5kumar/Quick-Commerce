import express from "express";
import { createCategory, getCategories } from "../controllers/categoryController.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", protect, adminOnly ,  createCategory);      // Create category
router.get("/", getCategories); 

export default router;