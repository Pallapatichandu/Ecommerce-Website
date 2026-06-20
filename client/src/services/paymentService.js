import api
from "./api";



export const processPayment =
async(amount,token)=>{

   const {data} =
   await api.post(

      "/payment/process",

      {

         amount

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