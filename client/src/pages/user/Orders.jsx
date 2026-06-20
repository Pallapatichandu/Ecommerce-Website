import {

   useEffect

} from "react";



import {

   useDispatch,
   useSelector

} from "react-redux";



import {

   Link

} from "react-router-dom";



import {

   fetchMyOrders

} from "../../redux/slices/orderSlice";





const Orders = () => {

   const dispatch =
      useDispatch();



   const { userInfo } =
      useSelector(

         (state) => state.auth

      );



   const {

      orders = [],
      loading

   } = useSelector(

      (state) => state.orders

   );



   /* =========================================
      FETCH ORDERS
   ========================================= */

   useEffect(() => {

      if (userInfo) {

         dispatch(

            fetchMyOrders(

               userInfo.token

            )

         );

      }

   }, [dispatch, userInfo]);



   /* =========================================
      LOADING
   ========================================= */

   if (loading) {

      return (

         <div className="text-center mt-5">

            <h2>

               Loading...

            </h2>

         </div>

      );

   }



   return (

      <div className="container py-5">

         {/* TITLE */}

         <div className="d-flex justify-content-between align-items-center mb-5">

            <h2 className="fw-bold">

               My Orders

            </h2>



            <span className="badge bg-dark fs-6">

               {

                  orders.length

               }

               {" "}

               Orders

            </span>

         </div>



         {

            orders.length === 0 ? (

               <div className="text-center py-5">

                  <h4>

                     No Orders Found

                  </h4>



                  <p className="text-muted">

                     Start shopping now

                  </p>

               </div>

            ) : (

               <div className="row">

                  {

                     orders.map((order) => (

                        <div

                           key={order._id}

                           className="col-lg-6 mb-4"

                        >

                           <div

                              className="card border-0 shadow-sm p-4"

                              style={{

                                 borderRadius: "18px"

                              }}

                           >

                              {/* ORDER HEADER */}

                              <div className="d-flex justify-content-between align-items-center">

                                 <div>

                                    <h5 className="fw-bold">

                                       Order ID

                                    </h5>



                                    <p className="text-muted m-0">

                                       {

                                          order._id.slice(0, 12)

                                       }

                                    </p>

                                 </div>



                                 <div>

                                    <span className="badge bg-dark">

                                       {

                                          order.orderStatus ||

                                          "Processing"

                                       }

                                    </span>

                                 </div>

                              </div>



                              <hr />



                              {/* PRODUCTS */}

                              {

                                 order.products?.map(

                                    (item, index) => (

                                       <div

                                          key={index}

                                          className="d-flex align-items-center gap-3 mb-4"

                                       >

                                          {/* IMAGE */}

                                          <img

                                             src={

                                                item.product

                                                   ?.images?.[0]

                                                ||

                                                "https://via.placeholder.com/100"

                                             }

                                             alt={

                                                item.product?.title

                                             }

                                             style={{

                                                width: "80px",

                                                height: "80px",

                                                objectFit: "cover",

                                                borderRadius: "12px"

                                             }}

                                          />



                                          {/* CONTENT */}

                                          <div className="flex-grow-1">

                                             <h6 className="fw-bold">

                                                {

                                                   item.product?.title

                                                }

                                             </h6>



                                             <p className="m-0 text-muted">

                                                Qty:

                                                {" "}

                                                {

                                                   item.quantity

                                                }

                                             </p>



                                             {order.discount > 0 ? (

                                                <>

                                                   <p className="m-0 text-muted text-decoration-line-through">

                                                      ₹ {item.totalPrice}

                                                   </p>

                                                   <p className="m-0 text-success fw-bold">

                                                      ₹ {

                                                         Math.round(

                                                            item.totalPrice -

                                                            (

                                                               item.totalPrice *

                                                               order.discount

                                                            ) / 100

                                                         )

                                                      }

                                                   </p>

                                                   <small className="text-success">

                                                      {order.discount}% OFF

                                                   </small>

                                                </>

                                             ) : (

                                                <p className="m-0 text-success fw-bold">

                                                   ₹ {item.totalPrice}

                                                </p>

                                             )}



                                             {/* WRITE REVIEW */}

                                             <Link

                                                to={`/product/${item.product?._id}`}

                                                className="btn btn-dark btn-sm mt-3"

                                             >

                                                Write Review

                                             </Link>

                                          </div>

                                       </div>

                                    )

                                 )

                              }



                              <hr />



                              {/* TOTAL */}

                              <div className="d-flex justify-content-between align-items-center">

                                 <h5 className="fw-bold">

                                    Total

                                 </h5>



                                 <div className="text-end">

                                    {order.discount > 0 && (

                                       <p className="text-muted text-decoration-line-through m-0">

                                          ₹ {order.originalPrice}

                                       </p>

                                    )}

                                    <h4 className="text-success fw-bold m-0">

                                       ₹ {order.totalPrice}

                                    </h4>

                                    {order.discount > 0 && (

                                       <small className="text-success">

                                          {order.discount}% OFF
                                          (-₹{order.discountAmount})

                                       </small>

                                    )}

                                 </div>

                              </div>



                              {/* SHIPPING */}

                              <div className="mt-4">

                                 <h6 className="fw-bold">

                                    Shipping Address

                                 </h6>



                                 <p className="text-muted mb-1">

                                    {

                                       order.shippingAddress?.fullName

                                    }

                                 </p>



                                 <p className="text-muted mb-1">

                                    {

                                       order.shippingAddress?.phone

                                    }

                                 </p>



                                 <p className="text-muted mb-1">

                                    {

                                       order.shippingAddress?.houseNo

                                    },

                                    {" "}

                                    {

                                       order.shippingAddress?.area

                                    }

                                 </p>



                                 <p className="text-muted mb-1">

                                    {

                                       order.shippingAddress?.city

                                    },

                                    {" "}

                                    {

                                       order.shippingAddress?.state

                                    }

                                 </p>



                                 <p className="text-muted mb-1">

                                    {

                                       order.shippingAddress?.country

                                    }

                                    {" - "}

                                    {

                                       order.shippingAddress?.pincode

                                    }

                                 </p>

                              </div>



                              {/* DATE */}

                              <div className="mt-3">

                                 <small className="text-muted">

                                    Ordered On:

                                    {" "}



                                    {

                                       new Date(

                                          order.createdAt

                                       ).toLocaleDateString()

                                    }

                                 </small>

                              </div>



                              {/* INVOICE */}

                              <a

                                 href={`http://localhost:8000/api/orders/invoice/${order._id}`}

                                 target="_blank"

                                 rel="noreferrer"

                                 className="btn btn-outline-dark mt-4"

                              >

                                 Download Invoice

                              </a>

                           </div>

                        </div>

                     ))

                  }

               </div>

            )

         }

      </div>

   );

};



export default Orders;