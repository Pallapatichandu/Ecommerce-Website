
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

// 1. CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://ecommerce-website-three-red-38.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// 2. BODY PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. DATABASE
connetDB();

// 4. PRODUCT ROUTES
// Supports both /products and /api/products
app.use("/", productRoutes);
app.use("/api", productRoutes);

// 5. OTHER ROUTES
app.use("/api/auth", authrouter);
app.use("/api", cartroutes);
app.use("/api", orderroutes);
app.use("/api", paymentrouter);
app.use("/api", Userrouter);
app.use("/api", wishlistRoutes);
app.use("/api", couponRoutes);
app.use("/api", adminRoutes);

// 6. HOME
app.get("/", (req, res) => {
  res.send("<h1>Hello Chandu - Backend Running</h1>");
});

// 7. HEALTH CHECK
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is working"
  });
});

// 8. LOCAL DEVELOPMENT
if (!process.env.VERCEL) {
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server running");
  });
}

// 9. VERCEL
export default app;
