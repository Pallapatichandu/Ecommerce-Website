import {

   useEffect,
   useRef

} from "react";



import {

   useDispatch,
   useSelector

} from "react-redux";



import {

   useNavigate

} from "react-router-dom";



import toast
   from "react-hot-toast";



import api
   from "../../services/api";



import {

   resetCart

} from "../../redux/slices/cartSlice";



const PaymentSuccess = () => {

   const dispatch =
      useDispatch();



   const navigate =
      useNavigate();



   const hasRun =
      useRef(false);



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

   const totalAmount =

      discountData?.finalPrice ||

      JSON.parse(

         localStorage.getItem(

            "checkoutTotal"

         )

      ) ||

      0;
   useEffect(() => {

      /* STOP DOUBLE EXECUTION */

      if (hasRun.current)

         return;



      hasRun.current = true;



      const successPayment =
         async () => {

            try {

               /* CREATE ORDER */

               await api.post(

                  "/payment-success",

                  {

                     totalAmount,

                     originalPrice:
                        discountData?.originalPrice,

                     couponCode:
                        discountData?.couponCode,

                     discount:
                        discountData?.discount,

                     discountAmount:
                        discountData?.discountAmount

                  },

                  {

                     headers: {

                        Authorization:
                           `Bearer ${userInfo.token}`

                     }

                  }

               );

               localStorage.removeItem(
                  "discountData"
               );



               /* CLEAR CART */

               dispatch(

                  resetCart()

               );



               /* SUCCESS TOAST */

               toast.success(

                  "Payment Successful"

               );



               /* REDIRECT */

               navigate(

                  "/orders"

               );

            }

            catch (error) {

               toast.error(

                  error.response?.data?.message ||

                  "Payment Failed"

               );

            }

         };



      if (userInfo) {

         successPayment();

      }

   }, [dispatch, navigate, userInfo]);



   return (

      <div className="container py-5 text-center">

         <div className="card border-0 shadow-sm p-5">

            <h1 className="text-success fw-bold mb-4">

               Payment Successful

            </h1>



            <p className="text-muted fs-5">

               Your order is being processed...

            </p>

         </div>

      </div>

   );

};



export default PaymentSuccess;