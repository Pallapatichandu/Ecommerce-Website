import Coupon from "../models/CouponModel.js";

import Product from "../models/ProductModel.js";

// CREATE COUPON

export const createCoupon = async(req,res)=>{

   try{

      const coupon =await Coupon.create({
         code:req.body.code,



         discount:
         req.body.discount,



         expireDate:
         req.body.expireDate,



         product:
         req.body.product,



         category:
         req.body.category,



         minAmount:
         req.body.minAmount

      });



      res.status(201).json(
         coupon
      );

   }catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};









// APPLY COUPON

export const applyCoupon = async(req,res)=>{

   try{

      const {code,productId,totalPrice} = req.body;



      // FIND COUPON

      const coupon =await Coupon.findOne({code}).populate("product");



      // INVALID COUPON

      if(!coupon){

         return res.status(404).json({

            message:
            "Invalid Coupon"

         });

      }



      // CHECK EXPIRE

      if(new Date() >coupon.expireDate){

         return res.status(400).json({

            message:
            "Coupon Expired"

         });

      }



      // MINIMUM AMOUNT CHECK

      if(totalPrice <coupon.minAmount){

         return res.status(400).json({

            message:
            `Minimum Purchase ₹${coupon.minAmount}`

         });

      }



      // PRODUCT CHECK

      if(coupon.product &&coupon.product._id.toString()!==productId){

         return res.status(400).json({

            message:
            "Coupon Not Valid For This Product"

         });

      }



      // CATEGORY CHECK

      if(coupon.category){

         const product =await Product.findById(productId);



         if(product.category !==coupon.category){

            return res.status(400).json({

               message:
               "Coupon Not Valid For This Category"

            });

         }

      }



      // DISCOUNT CALCULATION

      const discountAmount =(totalPrice *coupon.discount) / 100;



      // FINAL PRICE

      const finalPrice =totalPrice -discountAmount;
      res.status(200).json({

         originalPrice:
         totalPrice,



         couponCode:
         coupon.code,



         discount:
         coupon.discount,



         discountAmount,



         finalPrice

      });

   }catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};

export const getCoupons =async(req,res)=>{

   const coupons =await Coupon.find();

   res.json(coupons);

};

export const deleteCoupon =async(req,res)=>{

   await Coupon.findByIdAndDelete(req.params.id);

   res.json({
      message:"Deleted"
   });

};

export const getUserCoupons =async(req,res)=>{
   const coupons =await Coupon.find({

      expireDate:{$gte:new Date()}

   });

   res.status(200).json(
      coupons
   );

};