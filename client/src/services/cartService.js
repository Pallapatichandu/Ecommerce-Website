import api from "./api";



/* =========================================
   GET CART
========================================= */

export const getCart =
async(token)=>{

   const {data} =
   await api.get(

      "/cart",

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
   ADD TO CART
========================================= */

export const addCart = async(

   data,
   token

)=>{

   console.log(token);



   const response =
   await api.post(

      "/cart",

      data,

      {

         headers:{

            Authorization:

            `Bearer ${token}`

         }

      }

   );



   return response.data;

};



/* =========================================
   REMOVE CART
========================================= */

export const removeCart =
async(id,token)=>{

   const {data} =
   await api.delete(

      `/cart/${id}`,

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
   INCREASE QTY
========================================= */

export const increaseCartQty =
async(id,token)=>{

   const {data} =
   await api.put(

      `/cart/increase/${id}`,

      {},

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
   DECREASE QTY
========================================= */

export const decreaseCartQty =
async(id,token)=>{

   const {data} =
   await api.put(

      `/cart/decrease/${id}`,

      {},

      {

         headers:{

            Authorization:

            `Bearer ${token}`

         }

      }

   );



   return data;

};