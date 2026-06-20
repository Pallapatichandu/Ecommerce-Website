import express from "express";

import {

   loginUser,
   registerUser,
   forgotPassword,
   resetPassword

} from "../controllers/authController.js";

const authrouter =
express.Router();



// REGISTER

authrouter.post(

   "/register",

   registerUser

);



// LOGIN

authrouter.post(

   "/login",

   loginUser

);



// FORGOT PASSWORD

authrouter.post(

   "/forgot-password",

   forgotPassword

);



// RESET PASSWORD

authrouter.put(

   "/reset-password/:token",

   resetPassword

);

export default authrouter;