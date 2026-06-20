import {
   useState,useEffect
} from "react";

import {

   useSelector,
   useDispatch

} from "react-redux";

import {

   removeFromCart,
   increaseQty,
   decreaseQty

} from "../../redux/slices/cartSlice";

import {

   Link,
   useNavigate

} from "react-router-dom";

import toast
from "react-hot-toast";

import {

   FaTrash,
   FaMinus,
   FaPlus,
   FaShoppingCart

} from "react-icons/fa";

import api
from "../../services/api";
import {
   getUserCoupons,applyCoupon
} from "../../services/couponService";
const Cart = ()=>{

   const dispatch =
   useDispatch();

   const navigate =
   useNavigate();

   /* USER */

   const {userInfo} =
   useSelector(

      (state)=>state.auth

   );

   /* CART */

   const {

      cartItems = []

   } = useSelector(

      (state)=>state.cart

   );

   /* COUPON STATES */

   const [couponCode,setCouponCode] =
   useState("");

   const [discountData,setDiscountData] =
useState(

   JSON.parse(

      localStorage.getItem(
         "discountData"
      )

   ) || null

);
   const [coupons,setCoupons] =
useState([]);


/* TOTAL */

const totalPrice =

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

/* CLEAR OLD COUPON */

useEffect(()=>{

   if(

      discountData &&

      discountData.originalPrice !== totalPrice

   ){

      localStorage.removeItem(

         "discountData"

      );

      setDiscountData(null);

   }

},[totalPrice,discountData]);



useEffect(()=>{

   if(cartItems.length === 0){

      localStorage.removeItem(
         "discountData"
      );

      setDiscountData(null);
   }

},[cartItems]);


useEffect(()=>{

   const fetchCoupons =
   async()=>{

      try{

         const data =
         await getUserCoupons(

            userInfo.token

         );

         setCoupons(data);

      }

      catch(error){

         console.log(error);

      }

   };

   if(userInfo){

      fetchCoupons();

   }

},[userInfo]);

   /* REMOVE */

   const removeHandler = (id)=>{

      dispatch(

         removeFromCart({

            id,

            token:
            userInfo.token

         })

      );

      toast.success(

         "Removed From Cart"

      );

   };

   /* INCREASE */

   const increaseHandler = (id)=>{

      dispatch(

         increaseQty({

            id,

            token:
            userInfo.token

         })

      );

   };

   /* DECREASE */

   const decreaseHandler = (id)=>{

      dispatch(

         decreaseQty({

            id,

            token:
            userInfo.token

         })

      );

   };

   

   /* APPLY COUPON */

  const applyCouponHandler =
async()=>{

   try{

      const data =
      await applyCoupon(

         {

            code:couponCode,

            productId:
            cartItems[0]?.product?._id,

            totalPrice

         },

         userInfo.token

      );

      setDiscountData(data);

      localStorage.setItem(

         "discountData",

         JSON.stringify(data)

      );

      toast.success(

         "Coupon Applied"

      );

   }catch(error){

   console.log(
      error.response?.data
   );

   toast.error(

      error.response?.data?.message ||

      "Coupon Failed"

   );

}
};
   return(

      <div className="container py-5">

         {/* TITLE */}

         <div className="d-flex align-items-center gap-3 mb-5">

            <FaShoppingCart size={35} />

            <h2 className="fw-bold m-0">

               Shopping Cart

            </h2>

         </div>

         {

         cartItems.length === 0 ? (

            <div className="text-center py-5">

               <img

                  src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"

                  alt="empty cart"

                  style={{

                     width:"180px"

                  }}

               />

               <h3 className="mt-4 fw-bold">

                  Your Cart Is Empty

               </h3>

               <p className="text-muted">

                  Add products to continue shopping

               </p>

               <button

                  onClick={()=>

                     navigate("/")

                  }

                  className="btn btn-dark px-4 py-2 mt-3"

               >

                  Continue Shopping

               </button>

            </div>

         ) : (

            <div className="row">

               {/* LEFT */}

               <div className="col-lg-8">

                  {

                  cartItems.map(

                     (item)=>(

                        <div

                           key={item._id}

                           className="card border-0 shadow-sm mb-4"

                           style={{

                              borderRadius:"18px"

                           }}

                        >

                           <div className="row g-0 align-items-center">

                              {/* IMAGE */}

                              <div className="col-md-3">

                                 <img

                                    src={

                                       item.product
                                       ?.images?.[0]

                                       ||

                                       "https://dummyimage.com/300x300/cccccc/000000"

                                    }

                                    alt={

                                       item.product
                                       ?.title

                                    }

                                    className="img-fluid"

                                    style={{

                                       height:"220px",

                                       width:"100%",

                                       objectFit:"cover",

                                       borderTopLeftRadius:"18px",

                                       borderBottomLeftRadius:"18px"

                                    }}

                                 />

                              </div>

                              {/* CONTENT */}

                              <div className="col-md-9">

                                 <div className="card-body">

                                    {/* TITLE */}

                                    <Link

                                       to={`/product/${item.product?._id}`}

                                       className="text-decoration-none text-dark"

                                    >

                                       <h4 className="fw-bold">

                                          {

                                          item.product?.title

                                          }

                                       </h4>

                                    </Link>

                                    {/* CATEGORY */}

                                    <p className="text-muted mb-2">

                                       {

                                       item.product?.category

                                       }

                                    </p>

                                    {/* VARIANTS */}

                                    {

                                    item.variants?.length > 0 && (

                                    <div className="mb-3 d-flex flex-wrap gap-2">

                                       {

                                       item.variants.map(

                                          (variant,index)=>(

                                             <span

                                                key={index}

                                                className="badge"

                                                style={{

                                                   background:"#f3f4f6",

                                                   color:"#111827",

                                                   padding:"8px 14px",

                                                   borderRadius:"10px",

                                                   fontSize:"13px",

                                                   fontWeight:"600",

                                                   border:"1px solid #d1d5db"

                                                }}

                                             >

                                                {variant.type}

                                                {" : "}

                                                {variant.value}

                                             </span>

                                          )

                                       )

                                       }

                                    </div>

                                    )

                                    }

                                    {/* PRICE */}

                                    <h5 className="text-success fw-bold mb-4">

  ₹ {

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

}
</h5>

                                    {/* QUANTITY */}

                                    <div className="d-flex align-items-center gap-3 mb-4">

                                       <button

                                          onClick={()=>

                                             decreaseHandler(

                                                item._id

                                             )

                                          }

                                          className="btn btn-outline-dark"

                                       >

                                          <FaMinus />

                                       </button>

                                       <span className="fw-bold fs-5">

                                          {

                                          item.quantity

                                          }

                                       </span>

                                       <button

                                          onClick={()=>

                                             increaseHandler(

                                                item._id

                                             )

                                          }

                                          className="btn btn-outline-dark"

                                       >

                                          <FaPlus />

                                       </button>

                                    </div>

                                    {/* TOTAL */}

                                    <h5 className="fw-bold">

                                       Total:

                                       {" "}

                                       <span className="text-success">

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

                                    </h5>

                                    {/* REMOVE */}

                                    <button

                                       onClick={()=>

                                          removeHandler(

                                             item._id

                                          )

                                       }

                                       className="btn btn-danger mt-4"

                                    >

                                       <FaTrash />

                                       {" "}

                                       Remove

                                    </button>

                                 </div>

                              </div>

                           </div>

                        </div>

                     )

                  )

                  }

               </div>

               {/* RIGHT */}

               <div className="col-lg-4">

                  <div

                     className="card border-0 shadow-sm p-4"

                     style={{

                        borderRadius:"18px",

                        position:"sticky",

                        top:"100px"

                     }}

                  >

                     <h3 className="fw-bold mb-4">

                        Cart Summary

                     </h3>

                     <div className="d-flex justify-content-between mb-3">

                        <span>

                           Items

                        </span>

                        <span className="fw-bold">

                           {

                           cartItems.length

                           }

                        </span>

                     </div>

                     <div className="d-flex justify-content-between mb-3">

                        <span>

                           Delivery

                        </span>

                        <span className="text-success fw-bold">

                           FREE

                        </span>

                     </div>

                     <hr />

                     <div className="d-flex justify-content-between">

                        <h4 className="fw-bold">

                           Total

                        </h4>

                        <h4 className="fw-bold text-success">

                           ₹ {

                           discountData

                           ?

                           discountData.finalPrice

                           :

                           totalPrice

                           }

                        </h4>

                     </div>



                     {/* AVAILABLE COUPONS */}

{
coupons.length > 0 && (

<div className="mt-4 mb-4">

   <h5 className="fw-bold mb-3">

      Available Coupons

   </h5>

   {coupons.map((coupon,index)=>(

      <div

         key={coupon._id}

         className="border p-3 mb-3"

      >

         <h6>

            Coupon #{index+1}

         </h6>

         <p>

            Code: {coupon.code}

         </p>

         <p>

            Discount: {coupon.discount}%

         </p>

         <button

            className="btn btn-success"

            onClick={()=>{

               setCouponCode(
                  coupon.code
               );

            }}

         >

            Use Coupon

         </button>

      </div>

   ))}

</div>

)
}
                     {/* COUPON */}

                     <div className="mt-4">

                        <label className="fw-bold mb-2">

                           Apply Coupon

                        </label>

                        <div className="d-flex gap-2">

                           <input

                              type="text"

                              placeholder="Enter Coupon Code"

                              className="form-control"

                              value={couponCode}

                              onChange={(e)=>

                                 setCouponCode(

                                    e.target.value

                                 )

                              }

                           />

                           <button

                              className="btn btn-success"

                              onClick={applyCouponHandler}

                           >

                              Apply

                           </button>

                        </div>

                     </div>

                     {
discountData && (

<div
   className="alert alert-success mt-3"
>

   Coupon Applied:

   <strong>

      {" "}
      {discountData.couponCode}

   </strong>

   {" "}({discountData.discount}% OFF)

</div>

)
}

                     {/* DISCOUNT DETAILS */}

                     {
discountData &&
discountData.discountAmount > 0 && (

<div className="mt-4">

   <div className="d-flex justify-content-between mb-2">

      <span>
         Original Price
      </span>

      <span>
         ₹ {discountData.originalPrice}
      </span>

   </div>

   <div className="d-flex justify-content-between mb-2 text-success">

      <span>
         Discount
      </span>

      <span>
         - ₹ {discountData.discountAmount}
      </span>

   </div>

   <hr />

   <div className="d-flex justify-content-between fw-bold">

      <span>
         Final Price
      </span>

      <span className="text-success">
         ₹ {discountData.finalPrice}
      </span>

   </div>

</div>

)
}

{
discountData && (

<button

   className="btn btn-outline-danger mt-3"

   onClick={()=>{

      localStorage.removeItem(

         "discountData"

      );

      setDiscountData(null);

      setCouponCode("");

      toast.success(

         "Coupon Removed"

      );

   }}

>

   Remove Coupon

</button>

)
}

                     {/* CHECKOUT */}

                     <Link

   to="/checkout"

   className="btn btn-dark w-100 mt-4 py-3"

   style={{
      borderRadius:"12px"
   }}

   onClick={()=>{

      if(

         discountData &&

         discountData.originalPrice !== totalPrice

      ){

         localStorage.removeItem(

            "discountData"

         );

      }

   }}

>

   Proceed To Checkout

</Link>

                  </div>

               </div>

            </div>

         )

         }

      </div>

   );

};

export default Cart;

