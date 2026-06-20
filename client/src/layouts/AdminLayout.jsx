import {

   Outlet

} from "react-router-dom";



import AdminSidebar
from "../components/admin/AdminSidebar";



const AdminLayout = ()=>{

   return(

      <div className="d-flex">

         {/* SIDEBAR */}

         <AdminSidebar />



         {/* MAIN CONTENT */}

         <div

            className="flex-grow-1 p-4"

            style={{

               background:"#f8f9fa",

               minHeight:"100vh"

            }}

         >

            <Outlet />

         </div>

      </div>

   );

};



export default AdminLayout;