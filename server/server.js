
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

// CORS CONFIGURATION
const allowedOrigins = [
  "http://localhost:5173",
  "https://ecommerce-website-one-orpin.vercel.app",
  "https://ecommerce-website-three-red-38.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true
  })
);

// BODY PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DATABASE CONNECTION
let dbPromise;

app.use(async (req, res, next) => {
  try {
    if (!dbPromise) {
      dbPromise = connetDB().catch((error) => {
        dbPromise = null;
        throw error;
      });
    }

    await dbPromise;
    next();
  } catch (error) {
    console.error("Database connection failed:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed"
    });
  }
});

// PRODUCT ROUTES
app.use("/api", productRoutes);

// AUTH ROUTES
app.use("/api/auth", authrouter);

// CART ROUTES
app.use("/api", cartroutes);

// ORDER ROUTES
app.use("/api", orderroutes);

// PAYMENT ROUTES
app.use("/api", paymentrouter);

// USER ROUTES
app.use("/api", Userrouter);

// WISHLIST ROUTES
app.use("/api", wishlistRoutes);

// COUPON ROUTES
app.use("/api", couponRoutes);

// ADMIN ROUTES
app.use("/api", adminRoutes);

// HOME ROUTE
app.get("/", (req, res) => {
  res.send("Hello Chandu! Backend is running.");
});

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is working"
  });
});

// LOCAL SERVER
if (!process.env.VERCEL) {
  app.listen(process.env.PORT || 8000, () => {
    console.log(
      `Server running on port ${process.env.PORT || 8000}`
    );
  });
}

// VERCEL EXPORT
export default app;
