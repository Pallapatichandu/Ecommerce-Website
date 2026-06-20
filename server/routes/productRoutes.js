import express from "express";



import {

   addProduct,
   deleteProduct,
   getProducts,
   getSingleProduct,
   updateProduct,
   createReview,
   searchProducts,
   filterByCategory,
   filterByPrice,
   getRelatedProducts

} from "../controllers/productController.js";



import {

   protect

} from "../middleware/authMiddleware.js";



import {

   adminonly

} from "../middleware/adminMiddleware.js";



import upload
from "../middleware/uploadMiddleware.js";



const productRoutes =
express.Router();



/* =========================================
   PUBLIC ROUTES
========================================= */



// GET ALL PRODUCTS

productRoutes.get(

   "/products",

   getProducts

);



// SEARCH PRODUCTS

productRoutes.get(

   "/products/search",

   searchProducts

);



// FILTER PRODUCTS BY CATEGORY

productRoutes.get(

   "/products/category/:category",

   filterByCategory

);


productRoutes.get(

   "/products/price/filter",

   filterByPrice

);



// RELATED PRODUCTS

productRoutes.get(

   "/products/related/:id",

   getRelatedProducts

);



// GET SINGLE PRODUCT

productRoutes.get(

   "/products/:id",

   getSingleProduct

);



/* =========================================
   ADMIN ROUTES
========================================= */



// ADD PRODUCT

productRoutes.post(

   "/products",

   upload.array(

      "images",

      5

   ),

   protect,

   adminonly,

   addProduct

);


// UPDATE PRODUCT

productRoutes.put(

   "/products/:id",

   upload.array("images",5),

   protect,

   adminonly,

   updateProduct

);





// DELETE PRODUCT

productRoutes.delete(

   "/products/:id",

   protect,

   adminonly,

   deleteProduct

);



/* =========================================
   REVIEW ROUTES
========================================= */



// CREATE REVIEW

productRoutes.post(

   "/products/:id/review",

   protect,

   createReview

);



export default productRoutes;