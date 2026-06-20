import express from "express";

import {adminDashboard, salesReport} from "../controllers/adminController.js";

import {protect} from "../middleware/authMiddleware.js";

import {adminonly} from "../middleware/adminMiddleware.js";



const adminRoutes =express.Router();



// DASHBOARD

adminRoutes.get(

   "/admin/dashboard",

   protect,

   adminonly,

   adminDashboard

);


// SALES REPORT

adminRoutes.get(

   "/admin/sales-report",

   protect,

   adminonly,

   salesReport

);



export default adminRoutes;