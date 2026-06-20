import {

   useEffect

} from "react";



import {

   useDispatch,
   useSelector

} from "react-redux";



import {

   fetchAdminProducts,
   deleteProduct

} from "../../redux/slices/adminSlice";



import toast
from "react-hot-toast";



import {

   Link

} from "react-router-dom";



const AdminProducts = ()=>{

   const dispatch =
   useDispatch();



   /* =========================================
      ADMIN STATE
   ========================================= */

   const {

      products = [],
      loading

   } = useSelector(

      (state)=>state.admin

   );



   /* =========================================
      AUTH
   ========================================= */

   const {userInfo} =
   useSelector(

      (state)=>state.auth

   );



   /* =========================================
      FETCH PRODUCTS
   ========================================= */

   useEffect(()=>{

      if(userInfo){

         dispatch(

            fetchAdminProducts(

               userInfo.token

            )

         );

      }

   },[dispatch,userInfo]);



   /* =========================================
      DELETE PRODUCT
   ========================================= */

   const deleteHandler =
   async(id)=>{

      if(

         window.confirm(

            "Delete Product ?"

         )

      ){

         try{

            await dispatch(

               deleteProduct({

                  id,

                  token:userInfo.token

               })

            ).unwrap();



            toast.success(

               "Product Deleted"

            );

         }

         catch(error){

            toast.error(

               error

            );

         }

      }

   };



   return(

      <div className="container-fluid py-4">

         {/* =========================================
            HEADER
         ========================================= */}

         <div className="d-flex justify-content-between align-items-center mb-4">

            <div>

               <h2 className="fw-bold mb-1">

                  Admin Products

               </h2>



               <p className="text-muted">

                  Manage your ecommerce products

               </p>

            </div>



            <Link

               to="/admin/add-product"

               className="btn btn-dark"

            >

               Add Product

            </Link>

         </div>



         {/* =========================================
            TABLE CARD
         ========================================= */}

         <div

            className="card border-0 shadow-sm"

            style={{

               borderRadius:"18px"

            }}

         >

            <div className="table-responsive">

               <table className="table align-middle mb-0">

                  {/* =========================================
                     TABLE HEAD
                  ========================================= */}

                  <thead

                     className="table-dark"

                  >

                     <tr>

                        <th>Image</th>

                        <th>Title</th>

                        <th>Category</th>

                        <th>Price</th>

                        <th>Stock</th>

                        <th>Actions</th>

                     </tr>

                  </thead>



                  {/* =========================================
                     TABLE BODY
                  ========================================= */}

                  <tbody>

                     {

                     loading ? (

                        <tr>

                           <td

                              colSpan="6"

                              className="text-center py-5"

                           >

                              Loading...

                           </td>

                        </tr>

                     ) : products.length === 0 ? (

                        <tr>

                           <td

                              colSpan="6"

                              className="text-center py-5"

                           >

                              No Products Found

                           </td>

                        </tr>

                     ) : (

                        products.map(

                           (product)=>(

                              <tr

                                 key={product._id}

                              >

                                 {/* IMAGE */}

                                 <td>

                                    <img

                                       src={

                                          product.images?.[0] ||

                                          "https://via.placeholder.com/70"

                                       }

                                       alt={

                                          product.title

                                       }

                                       style={{

                                          width:"70px",

                                          height:"70px",

                                          objectFit:"cover",

                                          borderRadius:"12px"

                                       }}

                                    />

                                 </td>



                                 {/* TITLE */}

                                 <td>

                                    <h6 className="fw-bold mb-1">

                                       {

                                       product.title

                                       }

                                    </h6>

                                 </td>



                                 {/* CATEGORY */}

                                 <td>

                                    <span className="badge bg-secondary">

                                       {

                                       product.category

                                       }

                                    </span>

                                 </td>



                                 {/* PRICE */}

                                 <td>

                                    <span className="fw-bold text-success">

                                       Rs. {

                                       product.price

                                       }

                                    </span>

                                 </td>



                                 {/* STOCK */}

                                 <td>

                                    {

                                    product.stock > 0 ? (

                                       <span className="badge bg-success">

                                          In Stock

                                       </span>

                                    ) : (

                                       <span className="badge bg-danger">

                                          Out Of Stock

                                       </span>

                                    )

                                    }

                                 </td>



                                 {/* ACTIONS */}

                                 <td>

                                    <div className="d-flex gap-2">

                                       {/* EDIT */}

                                       <Link

                                          to={`/admin/product/${product._id}/edit`}

                                          className="btn btn-primary btn-sm"

                                       >

                                          Edit

                                       </Link>



                                       {/* DELETE */}

                                       <button

                                          className="btn btn-danger btn-sm"

                                          onClick={()=>

                                             deleteHandler(

                                                product._id

                                             )

                                          }

                                       >

                                          Delete

                                       </button>

                                    </div>

                                 </td>

                              </tr>

                           )

                        )

                     )

                     }

                  </tbody>

               </table>

            </div>

         </div>

      </div>

   );

};



export default AdminProducts;