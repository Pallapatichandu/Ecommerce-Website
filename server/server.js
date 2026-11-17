
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connetDB } from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import authrouter from "./routes/authRoutes.js";
import cartroutes from "./routes/cartRoutes.js";
import orderroutes from "./routes/orderRoutes.js";
import paymentrouter from "./routes/paymentRoutes.js";
import Userrouter from "./routes/userRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

// Allow local and deployed frontend
const allowedOrigins = [
  "http://localhost:5173",
  "https://ecommerce-website-three-red-38.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect database before handling API requests
let dbPromise;

app.use(async (req, res, next) => {
  try {
    dbPromise ||= connetDB().catch((error) => {
      dbPromise = null;
      throw error;
    });

    await dbPromise;
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed"
    });
  }
});

// API routes
app.use("/api", productRoutes);
app.use("/api/auth", authrouter);
app.use("/api", cartroutes);
app.use("/api", orderroutes);
app.use("/api", paymentrouter);
app.use("/api", Userrouter);
app.use("/api", wishlistRoutes);
app.use("/api", couponRoutes);
app.use("/api", adminRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Hello Chandu - Backend is running");
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is working"
  });
});

// Local development only
if (!process.env.VERCEL) {
  app.listen(process.env.PORT || 8000, () => {
    console.log("Server running on port 8000");
  });
}

export default app;
