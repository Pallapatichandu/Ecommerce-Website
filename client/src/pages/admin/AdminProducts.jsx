import {

   useEffect

} from "react";



import {

   Link

} from "react-router-dom";



import {

   useDispatch,
   useSelector

} from "react-redux";



import toast
from "react-hot-toast";



import {

   fetchAdminProducts,
   deleteProduct

} from "../../redux/slices/adminSlice";





const AdminProducts = ()=>{

   const dispatch =
   useDispatch();



   const {

      products = [],

      loading

   } = useSelector(

      (state)=>state.admin

   );



   const {userInfo} =
   useSelector(

      (state)=>state.auth

   );



   /* =========================================
      FETCH PRODUCTS
   ========================================= */

   useEffect(()=>{

      dispatch(

         fetchAdminProducts(

            userInfo.token

         )

      );

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

            toast.error(error);

         }

      }

   };



   return(

      <div className="container-fluid py-4">

         {/* =========================================
            HEADER
         ========================================= */}

         <div className="d-flex justify-content-between align-items-center mb-4">

            <h2 className="fw-bold">

               Products

            </h2>



            <Link

               to="/admin/add-product"

               className="btn btn-dark"

            >

               Add Product

            </Link>

         </div>



         {/* =========================================
            TABLE
         ========================================= */}

         <div className="card border-0 shadow-sm">

            <div className="table-responsive">

               <table className="table align-middle mb-0">

                  <thead className="table-dark">

                     <tr>

                        <th>Image</th>

                        <th>Title</th>

                        <th>Category</th>

                        <th>Price</th>

                        <th>Stock</th>

                        <th>Actions</th>

                     </tr>

                  </thead>



                  <tbody>

                     {

                     loading

                     ?

                     (

                        <tr>

                           <td

                              colSpan="6"

                              className="text-center py-4"

                           >

                              Loading...

                           </td>

                        </tr>

                     )

                     :

                     products.length === 0

                     ?

                     (

                        <tr>

                           <td

                              colSpan="6"

                              className="text-center py-4"

                           >

                              No Products Found

                           </td>

                        </tr>

                     )

                     :

                     (

                        products.map((product)=>(

                           <tr key={product._id}>

                              {/* IMAGE */}

                              <td>

                                 <img

                                    src={

                                       product.images?.[0]

                                    }

                                    alt={

                                       product.title

                                    }

                                    width="70"

                                    height="70"

                                    style={{

                                       objectFit:"cover",

                                       borderRadius:"12px"

                                    }}

                                 />

                              </td>



                              {/* TITLE */}

                              <td>

                                 <h6 className="fw-bold mb-0">

                                    {

                                    product.title

                                    }

                                 </h6>

                              </td>



                              {/* CATEGORY */}

                              <td>

                                 {

                                 product.category

                                 }

                              </td>



                              {/* PRICE */}

                              <td className="fw-bold text-success">

                                 ₹ {

                                 product.price

                                 }

                              </td>



                              {/* STOCK */}

                              <td>

                                 {

                                 product.stock

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

                                       onClick={()=>

                                          deleteHandler(

                                             product._id

                                          )

                                       }

                                       className="btn btn-danger btn-sm"

                                    >

                                       Delete

                                    </button>

                                 </div>

                              </td>

                           </tr>

                        ))

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