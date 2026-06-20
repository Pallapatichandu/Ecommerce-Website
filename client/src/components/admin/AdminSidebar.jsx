import {

   Link,
   useLocation

} from "react-router-dom";



import {

   FaBox,
   FaShoppingCart,
   FaUsers,
   FaChartBar,
   FaPlus,
   FaMoneyBillWave,
   FaTags

} from "react-icons/fa";





const AdminSidebar = ()=>{

   const location =
   useLocation();



   const menus = [

      {

         name:"Dashboard",

         path:"/admin",

         icon:<FaChartBar />

      },



      {

         name:"Add Product",

         path:"/admin/add-product",

         icon:<FaPlus />

      },



      {

         name:"Products",

         path:"/admin/products",

         icon:<FaBox />

      },



      {

         name:"Orders",

         path:"/admin/orders",

         icon:<FaShoppingCart />

      },



      {

         name:"Sales Report",

         path:"/admin/sales-report",

         icon:<FaMoneyBillWave />

      },

      {
   name:"Coupons",

   path:"/admin/coupons",

   icon:<FaTags />
},



      {

         name:"Users",

         path:"/admin/users",

         icon:<FaUsers />

      }

   ];



   return(

      <div

         style={{

            width:"260px",

            background:"#111827",

            minHeight:"100vh",

            padding:"25px"

         }}

      >

         {/* =========================================
            LOGO
         ========================================= */}

         <h2

            className="text-white fw-bold mb-5"

         >

            Admin Panel

         </h2>



         {/* =========================================
            MENUS
         ========================================= */}

         <div className="d-flex flex-column gap-3">

            {

            menus.map(

               (menu)=>(

                  <Link

                     key={menu.path}

                     to={menu.path}

                     className="text-decoration-none"

                     style={{

                        background:

                        location.pathname ===

                        menu.path

                        ?

                        "#2563eb"

                        :

                        "transparent",



                        color:"#fff",

                        padding:"14px 18px",

                        borderRadius:"14px",

                        fontWeight:"500",

                        display:"flex",

                        alignItems:"center",

                        gap:"12px",

                        transition:"0.3s"

                     }}

                  >

                     <span

                        style={{

                           fontSize:"18px"

                        }}

                     >

                        {menu.icon}

                     </span>



                     {menu.name}

                  </Link>

               )

            )

            }

         </div>

      </div>

   );

};



export default AdminSidebar;