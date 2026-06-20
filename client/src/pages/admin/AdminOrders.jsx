import {

   useEffect

} from "react";



import {

   useDispatch,
   useSelector

} from "react-redux";



import {

   fetchOrders,
   changeOrderStatus

} from "../../redux/slices/adminSlice";



import toast
from "react-hot-toast";



const AdminOrders = ()=>{

   const dispatch =
   useDispatch();



   const {

      orders = []

   } = useSelector(

      (state)=>state.admin

   );



   const {userInfo} =
   useSelector(

      (state)=>state.auth

   );



   useEffect(()=>{

      dispatch(

         fetchOrders(

            userInfo.token

         )

      );

   },[dispatch,userInfo]);



   /* STATUS UPDATE */

   const statusHandler =
   async(id,status)=>{

      try{

         await dispatch(

            changeOrderStatus({

               id,
               orderStatus:status,
               token:userInfo.token

            })

         ).unwrap();



         toast.success(

            "Status Updated"

         );

      }

      catch(error){

         toast.error(

            error

         );

      }

   };



   return(

      <div className="container-fluid py-4">

         <h2 className="fw-bold mb-4">

            Admin Orders

         </h2>



         <div className="card border-0 shadow-sm">

            <div className="table-responsive">

               <table className="table align-middle">

                  <thead className="table-dark">

                     <tr>

                        <th>Customer</th>

                        <th>Total</th>

                        <th>Status</th>

                        <th>Products</th>

                        <th>Update</th>

                     </tr>

                  </thead>



                  <tbody>

                     {

                     orders.map((order)=>(

                        <tr key={order._id}>

                           {/* CUSTOMER */}

                           <td>

                              <h6 className="fw-bold">

                                 {

                                 order.user?.name

                                 }

                              </h6>



                              <small>

                                 {

                                 order.user?.email

                                 }

                              </small>

                           </td>



                           {/* TOTAL */}

                           <td>

                              <span className="fw-bold text-success">

                                 Rs. {

                                 order.totalPrice

                                 }

                              </span>

                           </td>



                           {/* STATUS */}

                           <td>

                              <span className={`badge

                              ${

                                 order.orderStatus === "Delivered"

                                 ?

                                 "bg-success"

                                 :

                                 "bg-warning"

                              }`}>

                                 {

                                 order.orderStatus

                                 }

                              </span>

                           </td>



                           {/* PRODUCTS */}

                           <td>

                              {

                              order.products?.length

                              }

                           </td>



                           {/* UPDATE */}

                           <td>

                              <select

                                 value={

                                    order.orderStatus

                                 }

                                 onChange={(e)=>

                                    statusHandler(

                                       order._id,

                                       e.target.value

                                    )

                                 }

                                 className="form-select"

                              >

                                 <option>

                                    Processing

                                 </option>



                                 <option>

                                    Shipped

                                 </option>



                                 <option>

                                    Delivered

                                 </option>

                              </select>

                           </td>

                        </tr>

                     ))

                     }

                  </tbody>

               </table>

            </div>

         </div>

      </div>

   );

};



export default AdminOrders;