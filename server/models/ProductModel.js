import mongoose from "mongoose";

const productSchema =
new mongoose.Schema({

   title:{
      type:String,
      required:true
   },

   description:{
      type:String,
      required:true
   },

   price:{
      type:Number,
      required:true
   },
   discount:{
   type:Number,
   default:0
},

   images:[
      {
         type:String
      }
   ],

   category:{
      type:String,
      required:true
   },

   stock:{
      type:Number,
      required:true
   },

   /* PRODUCT HIGHLIGHTS */

   highlights:[
      {
         type:String
      }
   ],

   

  /* PRODUCT VARIANTS */

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

   /* REVIEWS */

   reviews:[

      {

         user:{
            type:
            mongoose.Schema.Types.ObjectId,

            ref:"User"
         },

         name:String,

         rating:Number,

         comment:String

      }

   ],

   numReviews:{
      type:Number,
      default:0
   },

   rating:{
      type:Number,
      default:0
   }

},{
   timestamps:true
});

const Product =
mongoose.model(

   "Product",

   productSchema

);

export default Product;