import mongoose from "mongoose";



const couponSchema =
new mongoose.Schema({

   // COUPON CODE

   code:{

      type:String,

      required:true,

      unique:true

   },



   // DISCOUNT %

   discount:{

      type:Number,

      required:true

   },



   // EXPIRE DATE

   expireDate:{

      type:Date,

      required:true

   },



   // SPECIFIC PRODUCT

   product:{

      type:
      mongoose.Schema.Types.ObjectId,

      ref:"Product"

   },



   // SPECIFIC CATEGORY

   category:{

      type:String

   },



   // MINIMUM ORDER AMOUNT

   minAmount:{

      type:Number,

      default:0

   }

},{
   timestamps:true
});



const Coupon =
mongoose.model(

   "Coupon",

   couponSchema

);



export default Coupon;