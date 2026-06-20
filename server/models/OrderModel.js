import mongoose from "mongoose";

const orderSchema =
new mongoose.Schema({

   /* USER */

   user:{

      type:
      mongoose.Schema.Types.ObjectId,

      ref:"User",

      required:true

   },

   /* PRODUCTS */

   products:[

      {

         product:{

            type:
            mongoose.Schema.Types.ObjectId,

            ref:"Product",

            required:true

         },

         quantity:{

            type:Number,

            required:true

         },

         /* VARIANTS */

         variants:[

            {

               type:{

                  type:String

               },

               value:String,

               price:Number,

               stock:Number

            }

         ],

         /* ITEM TOTAL */

         totalPrice:{

            type:Number,

            required:true

         }

      }

   ],

   /* SHIPPING ADDRESS */

   shippingAddress:{

      fullName:String,

      phone:String,

      pincode:String,

      city:String,

      state:String,

      country:String,

      houseNo:String,

      area:String

   },

   /* ORIGINAL PRICE */

   originalPrice:{

      type:Number,

      default:0

   },

   /* COUPON CODE */

   couponCode:{

      type:String,

      default:""

   },

   /* DISCOUNT PERCENTAGE */

   discount:{

      type:Number,

      default:0

   },

   /* DISCOUNT AMOUNT */

   discountAmount:{

      type:Number,

      default:0

   },

   /* FINAL TOTAL */

   totalPrice:{

      type:Number,

      required:true

   },

   /* PAYMENT STATUS */

   paymentStatus:{

      type:String,

      enum:[
         "Pending",
         "Paid",
         "Failed"
      ],

      default:"Pending"

   },

   /* ORDER STATUS */

   orderStatus:{

      type:String,

      enum:[
         "Processing",
         "Packed",
         "Shipped",
         "Out For Delivery",
         "Delivered",
         "Cancelled"
      ],

      default:"Processing"

   }

},
{
   timestamps:true
});

const Order =
mongoose.model(
   "Order",
   orderSchema
);

export default Order;