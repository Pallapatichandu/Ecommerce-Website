
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

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ecommerce-website-three-red-38.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connetDB();

app.use("/", productRoutes);
app.use("/api", productRoutes);

app.use("/api/auth", authrouter);
app.use("/api", cartroutes);
app.use("/api", orderroutes);
app.use("/api", paymentrouter);
app.use("/api", Userrouter);
app.use("/api", wishlistRoutes);
app.use("/api", couponRoutes);
app.use("/api", adminRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

export default app;
