import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { addToCart, decreaseQuantity, getCartItems, increaseQuantity, removeCartItem } from "../controllers/cartController.js"
const cartroutes=express.Router()

cartroutes.post("/cart",protect,addToCart)
cartroutes.get("/cart",protect,getCartItems)
cartroutes.put("/cart/increase/:id",protect,increaseQuantity)
cartroutes.put("/cart/decrease/:id",protect,decreaseQuantity)
cartroutes.delete("/cart/:id",protect,removeCartItem)

export default cartroutes