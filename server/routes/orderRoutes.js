import express from "express";



import {

   createOrder,
   getUserOrders,
   getAllOrders,
   updateOrderStatus,
   downloadInvoice

} from "../controllers/orderController.js";



import {

   protect

} from "../middleware/authMiddleware.js";



import {

   adminonly

} from "../middleware/adminMiddleware.js";



const orderroutes =
express.Router();



/* CREATE ORDER */

orderroutes.post(

   "/orders",

   protect,

   createOrder

);



/* USER ORDERS */

orderroutes.get(

   "/orders/myorders",

   protect,

   getUserOrders

);



/* DOWNLOAD INVOICE */

orderroutes.get(

   "/orders/invoice/:id",

   downloadInvoice

);



/* ADMIN ORDERS */

orderroutes.get(

   "/admin/orders",

   protect,

   adminonly,

   getAllOrders

);



/* UPDATE STATUS */

orderroutes.put(

   "/admin/orders/:id",

   protect,

   adminonly,

   updateOrderStatus

);



export default orderroutes;