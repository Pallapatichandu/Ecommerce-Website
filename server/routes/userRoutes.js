import express from "express";



import {

   saveAddress,
   getAllUsers,
   deleteUser

} from "../controllers/userController.js";



import {

   protect

} from "../middleware/authMiddleware.js";



import {

   adminonly

} from "../middleware/adminMiddleware.js";



const Userrouter =
express.Router();



/* =========================================
   SAVE ADDRESS
========================================= */

Userrouter.put(

   "/address",

   protect,

   saveAddress

);





/* =========================================
   ADMIN USERS
========================================= */

Userrouter.get(

   "/admin/users",

   protect,

   adminonly,

   getAllUsers

);





Userrouter.delete(

   "/admin/users/:id",

   protect,

   adminonly,

   deleteUser

);





export default Userrouter;