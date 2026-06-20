import {

   useEffect

} from "react";



import {

   useDispatch,
   useSelector

} from "react-redux";



import {

   fetchDashboard

} from "../../redux/slices/dashboardSlice";



const AdminDashboard = ()=>{

   const dispatch =
   useDispatch();



   const {

      stats = {}

   } = useSelector(

      (state)=>state.dashboard

   );



   const {userInfo} =
   useSelector(

      (state)=>state.auth

   );



   useEffect(()=>{

      dispatch(

         fetchDashboard(

            userInfo.token

         )

      );

   },[dispatch,userInfo]);



   return(

      <div className="container-fluid py-4">

         <h2 className="fw-bold mb-4">

            Admin Dashboard

         </h2>



         {/* CARDS */}

         <div className="row g-4 mb-5">

            {/* PRODUCTS */}

            <div className="col-md-3">

               <div className="card border-0 shadow-sm p-4">

                  <h6 className="text-muted">

                     Products

                  </h6>



                  <h2 className="fw-bold">

                     {

                     stats.totalProducts || 0

                     }

                  </h2>

               </div>

            </div>



            {/* ORDERS */}

            <div className="col-md-3">

               <div className="card border-0 shadow-sm p-4">

                  <h6 className="text-muted">

                     Orders

                  </h6>



                  <h2 className="fw-bold">

                     {

                     stats.totalOrders || 0

                     }

                  </h2>

               </div>

            </div>



            {/* USERS */}

            <div className="col-md-3">

               <div className="card border-0 shadow-sm p-4">

                  <h6 className="text-muted">

                     Users

                  </h6>



                  <h2 className="fw-bold">

                     {

                     stats.totalUsers || 0

                     }

                  </h2>

               </div>

            </div>


            



            {/* REVENUE */}

            <div className="col-md-3">

               <div className="card border-0 shadow-sm p-4">

                  <h6 className="text-muted">

                     Revenue

                  </h6>



                  <h2 className="fw-bold text-success">

                     Rs. {

                     stats.totalRevenue || 0

                     }

                  </h2>

               </div>

            </div>

         </div>



        


         



         {/* LATEST ORDERS */}

         <div className="card border-0 shadow-sm">

            <div className="card-body">

               <h4 className="fw-bold mb-4">

                  Latest Orders

               </h4>



               <div className="table-responsive">

                  <table className="table align-middle">

                     <thead className="table-dark">

                        <tr>

                           <th>Customer</th>

                           <th>Total</th>

                           <th>Status</th>

                        </tr>

                     </thead>



                     <tbody>

                        {

                        stats.latestOrders?.map((order)=>(

                           <tr key={order._id}>

                              <td>

                                 <h6 className="fw-bold mb-0">

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



                              <td>

                                 Rs. {

                                 order.totalPrice

                                 }

                              </td>



                              <td>

                                 <span className="badge bg-success">

                                    {

                                    order.orderStatus

                                    }

                                 </span>

                              </td>

                           </tr>

                        ))

                        }

                     </tbody>

                  </table>

               </div>

            </div>

         </div>

      </div>

   );

};



export default AdminDashboard;