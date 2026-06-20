import mongoose from "mongoose";

import bcrypt from "bcryptjs";



const userSchema = new mongoose.Schema({

   name:{

      type:String,

      required:true

   },



   email:{

      type:String,

      required:true,

      unique:true

   },



   password:{

      type:String,

      required:true

   },



   role:{

      type:String,

      default:"user"

   },



   // USER ADDRESS

   address:{

      fullName:String,

      phone:String,

      pincode:String,

      city:String,

      state:String,

      country:String,

      houseNo:String,

      area:String

   },



   // FORGOT PASSWORD

   resetToken:{

      type:String

   },



   resetTokenExpire:{

      type:Date

   }

},{
   timestamps:true
});







// HASH PASSWORD

userSchema.pre(

   "save",

   async function(){

      // IF PASSWORD NOT MODIFIED

      if(

         !this.isModified("password")

      ){

         return;

      }



      // HASH PASSWORD

      this.password =
      await bcrypt.hash(

         this.password,

         10

      );

   }

);







// PASSWORD COMPARE METHOD

userSchema.methods.matchPassword =
async function(password){

   return await bcrypt.compare(

      password,

      this.password

   );

};







export const User =
mongoose.model(

   "User",

   userSchema

);