import {

   useSelector

} from "react-redux";



import api
   from "../../services/api";



import toast
   from "react-hot-toast";



const Payment = () => {

   /* CART */

   const {

      cartItems = []

   } = useSelector(

      (state) => state.cart

   );



   /* USER */

   const { userInfo } =
      useSelector(

         (state) => state.auth

      );






   const discountData =

      JSON.parse(

         localStorage.getItem(

            "discountData"

         )

      );

const originalAmount =

cartItems.reduce(

   (acc,item)=>{

      const storagePrice =

      item.variants?.find(

         v => v.type === "Storage"

      )?.price ||

      item.product?.price ||

      0;

      const extraPrice =

      item.variants

      ?.filter(

         v => v.type !== "Storage"

      )

      .reduce(

         (sum,v)=>

            sum +

            Number(v.price || 0),

         0

      ) || 0;

      return acc +

      (

         (

            Number(storagePrice) +

            extraPrice

         )

         *

         item.quantity

      );

   },

   0

);
   const totalAmount =

      discountData

         ?

         discountData.finalPrice

         :

         originalAmount;



   /* =========================================
      PAYMENT
   ========================================= */

   const paymentHandler =
      async () => {

         try {

            const token =
               userInfo?.token;



            if (!token) {

               toast.error(

                  "Please Login"

               );



               return;

            }



            /* CREATE STRIPE SESSION */

            const { data } =
               await api.post(
                  "/payment",
                  {
                     totalAmount
                  },
                  {
                     headers: {
                        Authorization:
                           `Bearer ${token}`
                     }
                  }
               );



            /* REDIRECT TO STRIPE */

            window.location.href =

               data.url;

         }

         catch (error) {

            console.log(error);



            toast.error(

               error.response?.data?.message ||

               "Payment Failed"

            );

         }

      };



   return (

      <div className="container py-5">

         <div className="row justify-content-center">

            <div className="col-lg-5">

               <div

                  className="card border-0 shadow-sm p-4"

                  style={{

                     borderRadius: "18px"

                  }}

               >

                  <h3 className="fw-bold mb-4">

                     Secure Payment

                  </h3>

                  {

                     discountData && (

                        <>

                           <div className="d-flex justify-content-between">

                              <span>

                                 Original

                              </span>

                              <span>

                                 ₹ {discountData.originalPrice}

                              </span>

                           </div>

                           <div className="d-flex justify-content-between text-success">

                              <span>

                                 Discount

                              </span>

                              <span>

                                 - ₹ {discountData.discountAmount}

                              </span>

                           </div>

                           <hr />

                        </>

                     )

                  }

                  {/* TOTAL */}

                  <div

                     className="bg-light p-3 rounded mb-4"

                  >

                     <h5 className="fw-bold">

                        Total Amount

                     </h5>



                     <h3 className="text-success fw-bold">

                        ₹ {totalAmount}

                     </h3>

                  </div>



                  {/* PAY BUTTON */}

                  <button

                     onClick={paymentHandler}

                     className="btn btn-dark w-100 py-3"

                     style={{

                        borderRadius: "12px"

                     }}

                  >

                     Pay ₹ {totalAmount}

                  </button>

               </div>

            </div>

         </div>

      </div>

   );

};



export default Payment;