import api
from "./api";





/* =========================================
   SAVE ADDRESS
========================================= */

export const saveUserAddress =
async(

   addressData,
   token

)=>{

   const {data} =
   await api.put(

      "/address",

      addressData,

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
   GET ALL USERS
========================================= */

export const getUsers =
async(token)=>{

   const {data} =
   await api.get(

      "/admin/users",

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
   DELETE USER
========================================= */

export const removeUser =
async(

   id,
   token

)=>{

   const {data} =
   await api.delete(

      `/admin/users/${id}`,

      {

         headers:{

            Authorization:

            `Bearer ${token}`

         }

      }

   );



   return data;

};