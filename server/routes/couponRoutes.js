import express from "express";

import {

   createCoupon,
   applyCoupon,
   getCoupons,
   deleteCoupon,
   getUserCoupons

} from "../controllers/couponController.js";

import {

   protect

} from "../middleware/authMiddleware.js";

import {

   adminonly

} from "../middleware/adminMiddleware.js";



const couponRoutes =
express.Router();



// CREATE COUPON

couponRoutes.post(

   "/coupon",

   protect,

   adminonly,

   createCoupon

);



// APPLY COUPON

couponRoutes.post(

   "/coupon/apply",

   protect,

   applyCoupon

);

couponRoutes.get(
   "/coupon",
   protect,
   adminonly,
  getCoupons
);

couponRoutes.delete(
   "/coupon/:id",
   protect,
   adminonly,
   deleteCoupon
);
couponRoutes.get(
   "/coupon/user",
   protect,
   getUserCoupons
);



export default couponRoutes;