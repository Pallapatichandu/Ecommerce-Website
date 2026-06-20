import express from "express";

import {
   makePayment,
   paymentSuccess
} from "../controllers/paymentController.js";

import { protect }
from "../middleware/authMiddleware.js";

const paymentrouter = express.Router();



// CREATE STRIPE PAYMENT SESSION

paymentrouter.post(

   "/payment",

   protect,

   makePayment

);



// PAYMENT SUCCESS

paymentrouter.post(

   "/payment-success",

   protect,

   paymentSuccess

);



export default paymentrouter;