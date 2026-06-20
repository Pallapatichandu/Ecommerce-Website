import { User }
from "../models/UserModel.js";



/* =========================================
   SAVE USER ADDRESS
========================================= */

export const saveAddress = async(req,res)=>{

   try{

      /* FIND USER */

      const user =await User.findById(req.user._id);



      /* CHECK USER */

      if(!user){

         return res.status(404).json({

            message:"User Not Found"

         });

      }



      /* SAVE ADDRESS */

      user.address = {

         fullName:
         req.body.fullName,

         phone:
         req.body.phone,

         pincode:
         req.body.pincode,

         city:
         req.body.city,

         state:
         req.body.state,

         country:
         req.body.country,

         houseNo:
         req.body.houseNo,

         area:
         req.body.area

      };



      /* SAVE */

      await user.save();



      res.status(200).json({

         message:

         "Address Saved",

         address:user.address

      });

   }

   catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};





/* =========================================
   GET ALL USERS
========================================= */

export const getAllUsers =async(req,res)=>{

   try{

      const users =await User.find().select("-password");



      res.status(200).json(

         users

      );

   }catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};





/* =========================================
   DELETE USER
========================================= */

export const deleteUser =async(req,res)=>{

   try{

      const user =await User.findById(req.params.id);



      if(!user){

         return res.status(404).json({

            message:"User Not Found"

         });

      }



      await user.deleteOne();



      res.status(200).json({

         message:"User Deleted"

      });

   }

   catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};