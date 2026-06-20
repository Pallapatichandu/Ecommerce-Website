import Product from "../models/ProductModel.js";

import Order
from "../models/OrderModel.js";

import cloudinary
from "../config/cloudinary.js";





/* =========================================
   ADD PRODUCT
========================================= */

export const addProduct =async(req,res)=>{

   try{

      if(!req.body || Object.keys(req.body).length === 0){

         return res.status(400).json({

            message:"Empty Form Data"

         });

      }



      const title =req.body.title;



      const description =req.body.description;



      const price =req.body.price;



      const category =req.body.category;



      const stock =req.body.stock;



      /* =========================================
         HIGHLIGHTS
      ========================================= */

      const highlights =req.body.highlights ? JSON.parse(req.body.highlights):[];



      /* =========================================
         VARIANTS
      ========================================= */

      const variants =req.body.variants ?JSON.parse(req.body.variants):[];



      /* =========================================
         IMAGES
      ========================================= */

      const images = [];



      for(const file of req.files){

         const result =await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString("base64")}`,{folder:"products"});



         images.push(result.secure_url);

      }



      /* =========================================
         CREATE PRODUCT
      ========================================= */

      const product =await Product.create({

         title,

         description,

         price,

         category,

         stock,

         images,

         highlights,

         variants

      });



      res.status(201).json(

         product

      );

   }

   catch(error){

      console.log(error);



      res.status(400).json({

         message:error.message

      });

   }

};









/* =========================================
   GET ALL PRODUCTS
========================================= */

export const getProducts = async(req,res)=>{

   try{

      const products =await Product.find().sort({createdAt:-1});



      res.status(200).json(

         products

      );

   }catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};









/* =========================================
   GET SINGLE PRODUCT
========================================= */

export const getSingleProduct = async(req,res)=>{

   try{

      const product =await Product.findById(req.params.id);



      res.status(200).json(
         product
      );

   }catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};









/* =========================================
   UPDATE PRODUCT
========================================= */

export const updateProduct =async(req,res)=>{

   try{

      /* FIND PRODUCT */

      const product =await Product.findById(req.params.id);



      if(!product){

         return res.status(404).json({

            message:"Product Not Found"

         });

      }



      /* =========================================
         BASIC FIELDS
      ========================================= */

      product.title =
      req.body.title ||
      product.title;



      product.price =
      req.body.price ||
      product.price;



      product.category =
      req.body.category ||
      product.category;



      product.stock =
      req.body.stock ||
      product.stock;



      product.description =
      req.body.description ||
      product.description;



      /* =========================================
         HIGHLIGHTS
      ========================================= */

      if(req.body.highlights){

         product.highlights =JSON.parse( req.body.highlights);

      }



      /* =========================================
         VARIANTS
      ========================================= */

      if(req.body.variants){

         const parsedVariants =JSON.parse(req.body.variants);



         product.variants = parsedVariants.filter((variant)=>

               variant.name || variant.value || variant.stock

         );

      }



      /* =========================================
         KEEP EXISTING IMAGES
      ========================================= */

      if(req.body.existingImages){

         product.images =JSON.parse(req.body.existingImages);

      }



      /* =========================================
         UPLOAD NEW IMAGES
      ========================================= */

      if(req.files && req.files.length > 0){

         for(const file of req.files){

            const result =await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString("base64")}`,{folder:"products"}

            );



            product.images.push(result.secure_url);

         }

      }



      /* =========================================
         SAVE PRODUCT
      ========================================= */

      const updatedProduct =await product.save();



      res.status(200).json(updatedProduct);

   }catch(error){

      console.log(error);



      res.status(500).json({

         message:error.message

      });

   }

};









/* =========================================
   DELETE PRODUCT
========================================= */

export const deleteProduct = async(req,res)=>{

   try{

      await Product.findByIdAndDelete(req.params.id);



      res.status(200).json({

         message:
         "Product Deleted"

      });

   }catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};









/* =========================================
   CREATE PRODUCT REVIEW
========================================= */

export const createReview = async(req,res)=>{

   try{

      const {rating,comment} = req.body;



      /* =========================================
         FIND PRODUCT
      ========================================= */

      const product =await Product.findById(req.params.id);



      /* =========================================
         CHECK PRODUCT
      ========================================= */

      if(!product){

         return res.status(404).json({

            message:
            "Product Not Found"

         });

      }



      /* =========================================
         CHECK PURCHASED
      ========================================= */

      const hasPurchased =
      await Order.findOne({user:req.user._id,"products.product":req.params.id

      });



      if(!hasPurchased){

         return res.status(400).json({

            message:
            "Purchase Product To Review"

         });

      }



      /* =========================================
         CHECK ALREADY REVIEWED
      ========================================= */

      const alreadyReviewed =product.reviews.find((review)=>review.user.toString() === req.user._id.toString());



      if(alreadyReviewed){

         return res.status(400).json({

            message:
            "Product Already Reviewed"

         });

      }



      /* =========================================
         CREATE REVIEW
      ========================================= */

      const review = {

         user:req.user._id,

         name:req.user.name,

         rating:Number(rating),

         comment

      };



      /* =========================================
         PUSH REVIEW
      ========================================= */

      product.reviews.push(review);



      /* =========================================
         TOTAL REVIEWS
      ========================================= */

      product.numReviews =product.reviews.length;



      /* =========================================
         AVERAGE RATING
      ========================================= */

      product.rating =product.reviews.reduce((acc,item)=>item.rating + acc,0) /product.reviews.length;



      /* =========================================
         SAVE PRODUCT
      ========================================= */

      await product.save();



      res.status(201).json({

         message:
         "Review Added Successfully"

      });

   }catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};









/* =========================================
   SEARCH PRODUCTS
========================================= */

export const searchProducts = async(req,res)=>{

   try{

      const keyword =req.query.keyword;



      const products =await Product.find({

         title:{

            $regex:keyword,

            $options:"i"

         }

      });



      res.status(200).json(
         products
      );

   }catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};









/* =========================================
   FILTER PRODUCTS BY CATEGORY
========================================= */

export const filterByCategory = async(req,res)=>{

   try{

      const category =req.params.category;



      const products =await Product.find({

         category:{

            $regex:category,

            $options:"i"

         }

      });



      res.status(200).json(

         products

      );

   }catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};









/* =========================================
   FILTER PRODUCTS BY PRICE
========================================= */

export const filterByPrice = async(req,res)=>{

   try{

      const min =Number(req.query.min) || 0;



      const max =Number(req.query.max) || 100000000;



      const products =await Product.find({

         price:{

            $gte:min,

            $lte:max

         }

      });



      res.status(200).json(
         products
      );

   }

   catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};









/* =========================================
   RELATED PRODUCTS
========================================= */

export const getRelatedProducts =async(req,res)=>{

   try{

      /* FIND CURRENT PRODUCT */

      const product =await Product.findById(req.params.id);



      /* CHECK PRODUCT */

      if(!product){

         return res.status(404).json({

            message:
            "Product Not Found"

         });

      }



      /* FIND RELATED PRODUCTS */

      const relatedProducts =await Product.find({category:product.category,

         _id:{

            $ne:product._id

         }

      }).limit(4);



      res.status(200).json(

         relatedProducts

      );

   }catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};