import api from "./api";



/* =========================================
   CREATE ORDER
========================================= */

export const createOrder =
async(orderData,token)=>{

   const {data} =
   await api.post(

      "/orders",

      orderData,

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
   GET USER ORDERS
========================================= */

export const getMyOrders =
async(token)=>{

   const {data} =
   await api.get(

      "/orders/myorders",

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
   GET SINGLE ORDER
========================================= */

export const getSingleOrder =
async(id,token)=>{

   const {data} =
   await api.get(

      `/orders/${id}`,

      {

         headers:{

            Authorization:

            `Bearer ${token}`

         }

      }

   );



   return data;

};