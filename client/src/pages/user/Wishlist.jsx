import {useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {useNavigate,Link} from "react-router-dom";
import {FaTrash,FaShoppingCart,FaHeart} from "react-icons/fa";
import toast from "react-hot-toast";
import {fetchWishlist,deleteWishlist} from "../../redux/slices/wishlistSlice";
import {addToCart} from "../../redux/slices/cartSlice";
const Wishlist = ()=>{
const dispatch =useDispatch();
const navigate =useNavigate();
/* =========================================
      AUTH
========================================= */

 const {userInfo} = useSelector((state)=>state.auth);
/* =========================================
      WISHLIST
========================================= */
const {wishlistItems = [],loading} = useSelector((state)=>state.wishlist);
/* =========================================
      FETCH WISHLIST
   ========================================= */
useEffect(()=>{

      if(userInfo){

         dispatch(

            fetchWishlist(

               userInfo.token

            )

         );

      }

   },[

      dispatch,
      userInfo

   ]);

/* =========================================
      ADD TO CART
   ========================================= */

   const addToCartHandler = (productId)=>{

      if(!userInfo){

         toast.error(

            "Please Login First"

         );



         navigate("/login");



         return;

      }



      dispatch(

         addToCart({

            productId,
            quantity:1,
            token:userInfo.token

         })

      );



      toast.success(

         "Added To Cart"

      );



      navigate("/cart");

   };



   /* =========================================
      REMOVE WISHLIST
   ========================================= */

   const removeWishlistHandler = async(wishlistId)=>{

      try{

         await dispatch(

            deleteWishlist({

               id:wishlistId,

               token:userInfo.token

            })

         );



         toast.success(

            "Removed From Wishlist"

         );

      }

      catch(error){

         toast.error(

            "Failed To Remove"

         );

      }

   };

return(

      <div

         style={{

            background:"#f3f4f6",

            minHeight:"100vh"

         }}

      >

         <div className="container py-5">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center flex-wrap mb-5">

               <div>

                  <h1 className="fw-bold" style={{color:"#111827"}}>

                     My Wishlist

                  </h1>
                   <p className="text-muted">

                     Save your favorite products

                  </p>

               </div>



               {/* COUNT */}

               <div className="bg-white shadow-sm px-4 py-3" style={{borderRadius:"16px"}}>
               <h5 className="fw-bold mb-0" style={{color:"#dc2626"}}>
                  {wishlistItems.length}

                  </h5>



                  <small className="text-muted">

                     Wishlist Items

                  </small>

               </div>

            </div>



            {/* LOADING */}

            {

            loading && (

               <div className="text-center py-5">

                  <div

                     className="spinner-border text-danger"

                     role="status"

                  >

                     <span className="visually-hidden">

                        Loading...

                     </span>

                  </div>

               </div>

            )

            }



            {/* EMPTY */}

            {

            !loading &&

            wishlistItems.length === 0 && (

               <div

                  className="text-center bg-white shadow-sm py-5"

                  style={{

                     borderRadius:"24px"

                  }}

               >

                  <FaHeart

                     size={70}

                     color="#d1d5db"

                  />



                  <h3 className="fw-bold mt-4">

                     Wishlist is Empty

                  </h3>



                  <p className="text-muted">

                     Add products to your wishlist

                  </p>



                  <Link

                     to="/"

                     className="btn btn-dark px-4 py-2 mt-3"

                     style={{

                        borderRadius:"12px"

                     }}

                  >

                     Continue Shopping

                  </Link>

               </div>

            )

            }



            {/* PRODUCTS */}

            {

            !loading &&

            wishlistItems.length > 0 && (

               <div className="row g-4">

                  {

                  wishlistItems.map((item)=>{

                     const product =

                     item.product || item;



                     return(

                   <div
   key={item._id}
   className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4"   
>

   <div
      className="card border-0 h-100"
      style={{
         borderRadius:"16px",
         overflow:"hidden",
         boxShadow:"0 4px 15px rgba(0,0,0,.08)"
      }}
   >

      {/* IMAGE */}

      <div
         style={{
            height:"180px",
            background:"#f8fafc",
            position:"relative"
         }}
      >

         <img

            src={
               product.images?.[0]?.url ||
               product.images?.[0] ||
               "https://via.placeholder.com/300"
            }

            alt={product.title}

            style={{
               width:"100%",
               height:"100%",
               objectFit:"contain",
               padding:"10px"
            }}

         />

         <button

            onClick={()=>
               removeWishlistHandler(
                  item._id
               )
            }

            className="btn btn-light position-absolute"

            style={{
               top:"10px",
               right:"10px",
               width:"36px",
               height:"36px",
               borderRadius:"50%"
            }}

         >

            <FaTrash
               color="#dc2626"
               size={14}
            />

         </button>

      </div>

      {/* BODY */}

      <div className="card-body p-3">

         <small
            className="text-primary fw-bold"
         >
            {product.category}
         </small>

         <h6
            className="fw-bold mt-2 mb-2"
            style={{
               minHeight:"40px"
            }}
         >
            {product.title}
         </h6>

         <h5
            className="fw-bold text-dark"
         >
            ₹{
            Number(
               product.price
            ).toLocaleString(
               "en-IN"
            )
            }
         </h5>

         <div className="d-grid gap-2 mt-3">

            <button

               onClick={()=>
                  addToCartHandler(
                     product._id
                  )
               }

               className="btn btn-dark btn-sm d-flex align-items-center justify-content-center gap-2"

            >

               <FaShoppingCart />

               Cart

            </button>

            <Link

               to={`/product/${product._id}`}

               className="btn btn-outline-primary btn-sm"

            >

               View

            </Link>

         </div>

      </div>

   </div>

</div>

                     );

                  })

                  }

               </div>

            )

            }

         </div>

      </div>

   );

};



export default Wishlist;