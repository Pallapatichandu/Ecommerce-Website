import api from "./api";



/* =========================================
   GET PRODUCTS
========================================= */

export const getProducts = async()=>{

   const response =
   await api.get("/products");



   return response.data;

};





/* =========================================
   SINGLE PRODUCT
========================================= */

export const getSingleProduct = async(id)=>{

   const response =
   await api.get(

      `/products/${id}`

   );



   return response.data;

};





/* =========================================
   RELATED PRODUCTS
========================================= */

export const getRelatedProducts = async(id)=>{

   const response =
   await api.get(

      `/products/related/${id}`

   );



   return response.data;

};





/* =========================================
   ADD PRODUCT
========================================= */

export const addProduct =
async(formData,token)=>{

   const {data} =
   await api.post(

      "/products",

      formData,

      {

         headers:{

            Authorization:

            `Bearer ${token}`

         }

      }

   );



   return data;
};





/* =========================================
   CREATE REVIEW
========================================= */

export const createReview = async(

   productId,
   reviewData,
   token

)=>{

   const config = {

      headers:{

         Authorization:

         `Bearer ${token}`

      }

   };



   const {data} =

   await api.post(

      `/products/${productId}/review`,

      reviewData,

      config

   );



   return data;

};