import {
   useState
} from "react";


import {

   useSelector

} from "react-redux";



import {

   useNavigate

} from "react-router-dom";



import toast
from "react-hot-toast";



import api
from "../../services/api";





const Checkout = ()=>{

   const navigate =
   useNavigate();



   /* =========================================
      CART
   ========================================= */

   const {cartItems} =
   useSelector(

      (state)=>state.cart

   );



   /* =========================================
      USER
   ========================================= */

   const {userInfo} =
   useSelector(

      (state)=>state.auth

   );



   /* =========================================
      ADDRESS
   ========================================= */

   const [

      shippingAddress,

      setShippingAddress

   ] = useState({

      fullName:

      userInfo?.address?.fullName || "",

      phone:

      userInfo?.address?.phone || "",

      houseNo:

      userInfo?.address?.houseNo || "",

      area:

      userInfo?.address?.area || "",

      city:

      userInfo?.address?.city || "",

      state:

      userInfo?.address?.state || "",

      pincode:

      userInfo?.address?.pincode || "",

      country:

      userInfo?.address?.country || "India"

   });



   /* =========================================
      ADDRESS SAVED
   ========================================= */

   const [

      addressSaved,

      setAddressSaved

   ] = useState(

      userInfo?.address?.fullName

      ? true

      : false

   );



   /* =========================================
      HANDLE CHANGE
   ========================================= */

   const handleChange = (e)=>{

      setShippingAddress({

         ...shippingAddress,

         [e.target.name]:

         e.target.value

      });



      setAddressSaved(false);

   };



   /* =========================================
      SAVE ADDRESS
   ========================================= */

   const submitHandler =
   async(e)=>{

      e.preventDefault();



      try{

         const {data} =
         await api.put(

            "/address",

            shippingAddress,

            {

               headers:{

                  Authorization:

                  `Bearer ${userInfo.token}`

               }

            }

         );



         /* UPDATE LOCAL STORAGE */

         const updatedUser = {

            ...userInfo,

            address:data.address

         };



         localStorage.setItem(

            "userInfo",

            JSON.stringify(updatedUser)

         );



         setAddressSaved(true);



         toast.success(

            "Shipping Address Saved"

         );

      }

      catch(error){

         toast.error(

            error.response?.data?.message ||

            "Address Save Failed"

         );

      }

   };



   /* =========================================
      TOTAL
   ========================================= */

   const discountData =

JSON.parse(

   localStorage.getItem(
      "discountData"
   )

) || null;

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

         sum + Number(v.price || 0),

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

   const paymentHandler = ()=>{

   if(!addressSaved){

      toast.error(

         "Please Save Shipping Address"

      );

      return;

   }

   localStorage.setItem(

      "checkoutTotal",

      JSON.stringify(

         totalAmount

      )

   );

   navigate("/payment");

};



   return(

      <div className="container py-5">

         <div className="row g-5">

            {/* =========================================
               LEFT SIDE
            ========================================= */}

            <div className="col-lg-7">

               <div

                  className="card border-0 shadow-sm p-4"

                  style={{

                     borderRadius:"20px"

                  }}

               >

                  <h3 className="fw-bold mb-4">

                     Shipping Address

                  </h3>



                  <form onSubmit={submitHandler}>

                     {/* NAME + PHONE */}

                     <div className="row">

                        <div className="col-md-6 mb-3">

                           <label className="form-label">

                              Full Name

                           </label>



                           <input

                              type="text"

                              name="fullName"

                              className="form-control p-3"

                              placeholder="Enter Full Name"

                              value={shippingAddress.fullName}

                              onChange={handleChange}

                              required

                           />

                        </div>



                        <div className="col-md-6 mb-3">

                           <label className="form-label">

                              Phone Number

                           </label>



                           <input

                              type="text"

                              name="phone"

                              className="form-control p-3"

                              placeholder="Enter Phone Number"

                              value={shippingAddress.phone}

                              onChange={handleChange}

                              required

                           />

                        </div>

                     </div>



                     {/* HOUSE + AREA */}

                     <div className="row">

                        <div className="col-md-6 mb-3">

                           <label className="form-label">

                              House No

                           </label>



                           <input

                              type="text"

                              name="houseNo"

                              className="form-control p-3"

                              placeholder="House / Flat No"

                              value={shippingAddress.houseNo}

                              onChange={handleChange}

                              required

                           />

                        </div>



                        <div className="col-md-6 mb-3">

                           <label className="form-label">

                              Area

                           </label>



                           <input

                              type="text"

                              name="area"

                              className="form-control p-3"

                              placeholder="Area / Street"

                              value={shippingAddress.area}

                              onChange={handleChange}

                              required

                           />

                        </div>

                     </div>



                     {/* CITY + STATE */}

                     <div className="row">

                        <div className="col-md-6 mb-3">

                           <label className="form-label">

                              City

                           </label>



                           <input

                              type="text"

                              name="city"

                              className="form-control p-3"

                              placeholder="Enter City"

                              value={shippingAddress.city}

                              onChange={handleChange}

                              required

                           />

                        </div>



                        <div className="col-md-6 mb-3">

                           <label className="form-label">

                              State

                           </label>



                           <input

                              type="text"

                              name="state"

                              className="form-control p-3"

                              placeholder="Enter State"

                              value={shippingAddress.state}

                              onChange={handleChange}

                              required

                           />

                        </div>

                     </div>



                     {/* PINCODE + COUNTRY */}

                     <div className="row">

                        <div className="col-md-6 mb-3">

                           <label className="form-label">

                              Pincode

                           </label>



                           <input

                              type="text"

                              name="pincode"

                              className="form-control p-3"

                              placeholder="Enter Pincode"

                              value={shippingAddress.pincode}

                              onChange={handleChange}

                              required

                           />

                        </div>



                        <div className="col-md-6 mb-3">

                           <label className="form-label">

                              Country

                           </label>



                           <input

                              type="text"

                              name="country"

                              className="form-control p-3"

                              value="India"

                              readOnly

                           />

                        </div>

                     </div>



                     {/* SAVE BUTTON */}

                     <button

                        className="btn btn-dark px-5 py-3 mt-3"

                        style={{

                           borderRadius:"12px"

                        }}

                     >

                        {

                        addressSaved

                        ?

                        "Update Address"

                        :

                        "Save Address"

                        }

                     </button>

                  </form>

               </div>

            </div>



            {/* =========================================
               RIGHT SIDE
            ========================================= */}

            <div className="col-lg-5">

               <div

                  className="card border-0 shadow-sm p-4"

                  style={{

                     borderRadius:"20px"

                  }}

               >

                  <h4 className="fw-bold mb-4">

                     Order Summary

                  </h4>



                  {

                  cartItems.map(

                     (item)=>(

                        <div

                           key={item._id}

                           className="d-flex justify-content-between align-items-center mb-4"

                        >

                           <div className="d-flex align-items-center gap-3">

                              <img

                                 src={

                                    item.product.images?.[0]

                                 }

                                 alt={

                                    item.product.title

                                 }

                                 width="70"

                                 height="70"

                                 style={{

                                    objectFit:"cover",

                                    borderRadius:"12px"

                                 }}

                              />



                              <div>

                                 <h6 className="fw-bold mb-1">

                                    {

                                    item.product.title

                                    }

                                 </h6>



                                 <small className="text-muted">

                                    Qty:

                                    {" "}

                                    {

                                    item.quantity

                                    }

                                 </small>

                              </div>

                           </div>



                           <span className="fw-bold text-success">

   ₹ {

      (

Number(

item.variants?.find(

v => v.type === "Storage"

)?.price ||

item.product?.price ||

0

)

+

(

item.variants

?.filter(

v => v.type !== "Storage"

)

.reduce(

(sum,v)=>

sum + Number(v.price || 0),

0

) || 0

)

)

*

item.quantity

   }

</span>

                        </div>

                     )

                  )

                  }



                  <hr />



                  {
discountData &&
discountData.discountAmount > 0 &&(

<>

<div className="d-flex justify-content-between mb-2">

   <span>
      Original
   </span>

   <span>
      ₹ {discountData.originalPrice}
   </span>

</div>

<div className="d-flex justify-content-between text-success mb-2">

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

<div className="d-flex justify-content-between">

   <h5 className="fw-bold">
      Total
   </h5>

   <h5 className="fw-bold text-success">
      ₹ {totalAmount}
   </h5>

</div>



                  <button

                     onClick={paymentHandler}

                     className="btn btn-success w-100 py-3 mt-4"

                     style={{

                        borderRadius:"12px"

                     }}

                  >

                     Continue To Payment

                  </button>

               </div>

            </div>

         </div>

      </div>

   );

};



export default Checkout;