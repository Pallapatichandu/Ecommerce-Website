import mongoose from "mongoose";

const CartSchema =
new mongoose.Schema({

   user:{

      type:
      mongoose.Schema.Types.ObjectId,

      ref:"User",

      required:true

   },



   product:{

      type:
      mongoose.Schema.Types.ObjectId,

      ref:"Product",

      required:true

   },



   quantity:{

      type:Number,

      default:1

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

]



},{

   timestamps:true

});



const Cart =
mongoose.model(

   "Cart",

   CartSchema

);



export default Cart;