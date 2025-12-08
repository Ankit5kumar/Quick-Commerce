import express from "express";
import { createCategory, getCategories } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", createCategory);      // Create category
router.get("/", getCategories); 

export default router;