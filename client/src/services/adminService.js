import api
from "./api";



/* =========================================
   GET DASHBOARD STATS
========================================= */

export const getDashboardStats =async(token)=>{

   const {data} =await api.get("/admin/dashboard",

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
   GET SALES REPORT
========================================= */

export const getSalesReport =
async(token)=>{

   const {data} =
   await api.get(

      "/admin/sales-report",

      {

         headers:{

            Authorization:

            `Bearer ${token}`

         }

      }

   );



   return data;

};