import {

   useEffect

} from "react";



import {

   useDispatch,
   useSelector

} from "react-redux";



import {

   fetchSalesReport

} from "../../redux/slices/salesSlice";



const SalesReport = ()=>{

   const dispatch =
   useDispatch();



   const {

      report = {}

   } = useSelector(

      (state)=>state.sales

   );



   const {userInfo} =
   useSelector(

      (state)=>state.auth

   );



   useEffect(()=>{

      dispatch(

         fetchSalesReport(

            userInfo.token

         )

      );

   },[dispatch,userInfo]);



   return(

      <div className="container-fluid py-4">

         <h2 className="fw-bold mb-4">

            Sales Report

         </h2>



         {/* =========================================
            CARDS
         ========================================= */}

         <div className="row g-4 mb-5">

            {/* TOTAL SALES */}

            <div className="col-md-6">

               <div className="card border-0 shadow-sm p-4">

                  <h6 className="text-muted">

                     Total Sales

                  </h6>



                  <h2 className="fw-bold text-success">

                     Rs. {

                     report.totalSales || 0

                     }

                  </h2>

               </div>

            </div>



            {/* TOTAL ORDERS */}

            <div className="col-md-6">

               <div className="card border-0 shadow-sm p-4">

                  <h6 className="text-muted">

                     Total Orders

                  </h6>



                  <h2 className="fw-bold">

                     {

                     report.totalOrders || 0

                     }

                  </h2>

               </div>

            </div>

         </div>



         {/* =========================================
            MONTHLY SALES
         ========================================= */}

         <div className="card border-0 shadow-sm">

            <div className="card-body">

               <h4 className="fw-bold mb-4">

                  Monthly Sales

               </h4>



               <div className="table-responsive">

                  <table className="table">

                     <thead className="table-dark">

                        <tr>

                           <th>Month</th>

                           <th>Revenue</th>

                        </tr>

                     </thead>



                     <tbody>

                        {

                        Object.entries(

                           report.monthlySales || {}

                        ).map(([month,sales])=>(

                           <tr key={month}>

                              <td>

                                 {month}

                              </td>



                              <td className="fw-bold text-success">

                                 Rs. {sales}

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



export default SalesReport;