import api from "./api";

/* GET USER COUPONS */

export const getUserCoupons =
async(token)=>{

   const {data} =
   await api.get(

      "/coupon/user",

      {

         headers:{

            Authorization:

            `Bearer ${token}`

         }

      }

   );

   return data;

};

export const applyCoupon =
async(

   couponData,
   token

)=>{

   const {data} =
   await api.post(

      "/coupon/apply",

      couponData,

      {

         headers:{

            Authorization:

            `Bearer ${token}`

         }

      }

   );

   return data;

};