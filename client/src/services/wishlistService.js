import api from "./api";



/* =========================================
   GET WISHLIST
========================================= */

export const getWishlist =
async(token)=>{

   const {data} =
   await api.get(

      "/wishlist",

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
   ADD TO WISHLIST
========================================= */

export const addWishlist =
async(productId,token)=>{

   const {data} =
   await api.post(

      "/wishlist",

      {

         productId

      },

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
   REMOVE WISHLIST
========================================= */

export const removeWishlist =
async(id,token)=>{

   const {data} =
   await api.delete(

      `/wishlist/${id}`,

      {

         headers:{

            Authorization:

            `Bearer ${token}`

         }

      }

   );



   return data;

};