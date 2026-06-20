import Wishlist
from "../models/WishlistModel.js";

/* ADD TO WISHLIST */

export const addToWishlist = async(req,res)=>{

   try{

      const {productId} = req.body;



      /* CHECK EXISTS */

      const alreadyExists =await Wishlist.findOne({user:req.user._id,product:productId});



      /* IF EXISTS */

      if(alreadyExists){

         const existingWishlist =await Wishlist.findById(alreadyExists._id).populate("product");



         return res.status(200).json(

            existingWishlist

         );

      }



      /* CREATE */

      const wishlist =await Wishlist.create({user:req.user._id,product:productId});



      /* POPULATE */

      const populatedWishlist =await Wishlist.findById(wishlist._id).populate("product");



      res.status(201).json(populatedWishlist);

   }catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};









/* GET USER WISHLIST */

export const getWishlist = async(req,res)=>{

   try{

      const wishlist =await Wishlist.find({user:req.user._id}).populate("product");



      res.status(200).json(

         wishlist

      );

   }catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};









/* REMOVE WISHLIST */

export const removeWishlist = async(req,res)=>{

   try{

      await Wishlist.findByIdAndDelete(req.params.id);



      res.status(200).json({

         message:

         "Removed From Wishlist"

      });

   }catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};