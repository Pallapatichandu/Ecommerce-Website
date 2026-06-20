import { User }from "../models/UserModel.js";
import Product from "../models/ProductModel.js";
import Order from "../models/OrderModel.js";
/* =========================================
   ADMIN DASHBOARD
========================================= */

export const adminDashboard =async(req,res)=>{

   try{

      /* TOTAL USERS */

      const totalUsers =await User.countDocuments();

      /* TOTAL PRODUCTS */

      const totalProducts =await Product.countDocuments();
      /* TOTAL ORDERS */
      const totalOrders =
      await Order.countDocuments();
     /* GET ORDERS */
      const orders =await Order.find();
     /* TOTAL REVENUE */
      const totalRevenue =orders.reduce((acc,item)=>acc + item.totalPrice,0);
   /* LATEST ORDERS */

      const latestOrders =await Order.find().populate("user","name email").sort({

         createdAt:-1

      })

      .limit(5);



      /* RESPONSE */

      res.status(200).json({

         totalUsers,

         totalProducts,

         totalOrders,

         totalRevenue,

         latestOrders

      });

   }

   catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};





/* =========================================
   SALES REPORT
========================================= */

export const salesReport =async(req,res)=>{

   try{

      const orders =await Order.find({paymentStatus:"Paid"});

      const totalSales =orders.reduce((acc,item)=>acc + item.totalPrice,0);

      const totalOrders =orders.length;

      const monthlySales = {};

      orders.forEach((order)=>{const month =new Date(order.createdAt).toLocaleString("default",{ month:"long"});

         monthlySales[month] =(monthlySales[month] || 0)+order.totalPrice;});

      res.status(200).json({

         totalSales,

         totalOrders,

         monthlySales

      });

   }

   catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};