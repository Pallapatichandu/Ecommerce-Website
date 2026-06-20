import crypto from "crypto";
import bcrypt from "bcryptjs";
import { User }from "../models/UserModel.js";
import { generateToken }from "../utils/generateToken.js";
import { sendMail }from "../utils/sendMail.js";


// REGISTER USER
export const registerUser = async(req,res)=>{
   try{
         const {name,email,password} = req.body;

// CHECK USER EXISTS

      const userExists =await User.findOne({email});

      if(userExists){

         return res.status(400).json({

            message:
            "User Already Exists"

         });

      }



      // CREATE USER

      const user =await User.create({name,email,password});

      res.status(201).json({

         _id:user._id,

         name:user.name,

         email:user.email,

         role:user.role,

         token:
         generateToken(user._id)

      });

   }catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};









// LOGIN USER

export const loginUser = async(req,res)=>{

   try{

      const {email,password} = req.body;

      // FIND USER
      const user =await User.findOne({email});



      // CHECK PASSWORD

      if(user &&await bcrypt.compare(password,user.password)){

         res.status(200).json({

            _id:user._id,

            name:user.name,

            email:user.email,

            role:user.role,

            token:
            generateToken(user._id)

         });

      }else{

         res.status(401).json({

            message:
            "Invalid Email or Password"

         });

      }

   }catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};









// FORGOT PASSWORD

export const forgotPassword = async(req,res)=>{

   try{

      // FIND USER

      const user =await User.findOne({email:req.body.email});



      // CHECK USER

      if(!user){

         return res.status(404).json({

            message:"User Not Found"

         });

      }



      // GENERATE TOKEN

      const resetToken =crypto.randomBytes(20).toString("hex");

     // SAVE TOKEN
     user.resetToken =resetToken;

     user.resetTokenExpire =Date.now() + 10*60*1000;

     await user.save();

    // RESET URL

      const resetUrl =`http://localhost:5173/reset-password/${resetToken}`;

   // SEND EMAIL

      await sendMail(user.email,

         "Password Reset",

         `Reset Password Link:${resetUrl}`

      );



      res.status(200).json({

         message:"Reset Link Sent"

      });

   }catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};









// RESET PASSWORD

export const resetPassword = async(req,res)=>{

   try{

      // FIND USER USING TOKEN

      const user =await User.findOne({ resetToken:req.params.token, resetTokenExpire:{$gt:Date.now()}});



      // CHECK TOKEN

      if(!user){

         return res.status(400).json({

            message:
            "Invalid Or Expired Token"

         });

      }



      // UPDATE PASSWORD

      // UserModel pre-save middleware
      // automatically hashes password

      user.password =req.body.password;

      // CLEAR TOKEN

      user.resetToken =undefined;

      user.resetTokenExpire =undefined;

     // SAVE USER

      await user.save();



      res.status(200).json({

         message:
         "Password Reset Successful"

      });

   }catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};