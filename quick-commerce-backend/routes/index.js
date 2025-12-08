import express from "express";
import authRoutes from "./auth.routes.js";
import productRoutes from "./product.routes.js";
import orderRoutes from "./order.routes.js";
import categoryRoutes from "./category.Routes.js";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/categories", categoryRoutes);
export default router;
