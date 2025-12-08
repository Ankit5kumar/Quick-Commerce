import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// 🧠 Security middlewares
app.use(helmet());
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan("dev"));

// 🚫 Rate Limiter (protect from brute-force)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api", limiter);

// 🗄️ DB Connection
connectDB();

// 🌐 API Routes
app.use("/api", routes);
app.use(errorHandler);

export default app;
