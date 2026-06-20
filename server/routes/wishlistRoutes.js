import express from "express";

import {

   addToWishlist,
   getWishlist,
   removeWishlist

} from "../controllers/wishlistController.js";

import {

   protect

} from "../middleware/authMiddleware.js";



const wishlistRoutes =express.Router();



// ADD TO WISHLIST

wishlistRoutes.post(

   "/wishlist",

   protect,

   addToWishlist

);



// GET WISHLIST

wishlistRoutes.get(

   "/wishlist",

   protect,

   getWishlist

);



// REMOVE WISHLIST

wishlistRoutes.delete(

   "/wishlist/:id",

   protect,

   removeWishlist

);



export default wishlistRoutes;