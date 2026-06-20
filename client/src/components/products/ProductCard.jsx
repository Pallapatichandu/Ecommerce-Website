import { Link } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
   addToWishlist,
   deleteWishlist
} from "../../redux/slices/wishlistSlice";

const ProductCard = ({ product }) => {

   const dispatch = useDispatch();

   const { userInfo } =
   useSelector(
      (state) => state.auth
   );

   const {
      wishlistItems = []
   } = useSelector(
      (state) => state.wishlist
   );

   const [
      liked,
      setLiked
   ] = useState(false);

   useEffect(() => {

      const exists =
      wishlistItems.find((item) => {

         const wishlistProduct =
         item.product || item;

         return (
            wishlistProduct?._id ===
            product?._id
         );

      });

      setLiked(!!exists);

   }, [
      wishlistItems,
      product
   ]);

   const wishlistHandler =
   async (e) => {

      e.preventDefault();

      if (!userInfo) {

         toast.error(
            "Please Login First"
         );

         return;
      }

      try {

         if (liked) {

            const wishlistItem =
            wishlistItems.find((item) => {

               const wishlistProduct =
               item.product || item;

               return (
                  wishlistProduct?._id ===
                  product?._id
               );

            });

            if (wishlistItem) {

               await dispatch(

                  deleteWishlist({

                     id:
                     wishlistItem._id,

                     token:
                     userInfo.token

                  })

               );

               setLiked(false);

               toast.success(
                  "Removed From Wishlist"
               );
            }

         } else {

            await dispatch(

               addToWishlist({

                  productId:
                  product._id,

                  token:
                  userInfo.token

               })

            );

            setLiked(true);

            toast.success(
               "Added To Wishlist"
            );
         }

      } catch {

         toast.error(
            "Something Went Wrong"
         );

      }

   };

   return (

      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">

         <div
            className="card border-0 h-100"
            style={{
               borderRadius: "18px",
               overflow: "hidden",
               boxShadow:
               "0 6px 20px rgba(0,0,0,0.08)"
            }}
         >

            {/* IMAGE */}

            <div
               className="position-relative"
               style={{
                  height: "220px",
                  background: "#f8fafc"
               }}
            >

               {/* DISCOUNT */}

               {
               product.discount > 0 && (

                  <span
                     className="badge bg-danger position-absolute"
                     style={{
                        top: "10px",
                        left: "10px",
                        zIndex: 2
                     }}
                  >

                     {product.discount}% OFF

                  </span>

               )
               }

               {/* STOCK */}

               <span
                  className={`badge position-absolute ${
                     product.stock > 0
                     ? "bg-success"
                     : "bg-danger"
                  }`}
                  style={{
                     top: "10px",
                     right: "10px",
                     zIndex: 2
                  }}
               >

                  {
                  product.stock > 0
                  ? "In Stock"
                  : "Sold Out"
                  }

               </span>

               {/* WISHLIST */}

               <button

                  onClick={
                     wishlistHandler
                  }

                  className="btn position-absolute"

                  style={{
                     bottom: "10px",
                     right: "10px",
                     width: "42px",
                     height: "42px",
                     borderRadius: "50%",
                     background: "#fff",
                     border: "none",
                     zIndex: 2
                  }}

               >

                  <FaHeart

                     color={
                        liked
                        ? "#ef4444"
                        : "#9ca3af"
                     }

                  />

               </button>

               <img

                  src={

                     product.images?.[0]?.url ||

                     product.images?.[0] ||

                     "https://via.placeholder.com/300"

                  }

                  alt={product.title}

                  style={{
                     width: "100%",
                     height: "100%",
                     objectFit: "contain",
                     padding: "10px"
                  }}

               />

            </div>

            {/* BODY */}

            <div className="card-body p-3">

               <small
                  className="text-primary fw-bold"
               >
                  {product.category}
               </small>

               <h6
                  className="fw-bold mt-2"
                  style={{
                     minHeight: "45px"
                  }}
               >
                  {product.title}
               </h6>

               {/* RATING */}

               <div
                  className="d-flex align-items-center gap-1 mb-2"
               >

                  {

                  [...Array(5)].map(
                     (_, index) => (

                        <FaStar

                           key={index}

                           size={14}

                           color={

                              index <
                              Math.round(
                                 product.rating || 0
                              )

                              ? "#f59e0b"

                              : "#d1d5db"

                           }

                        />

                     )
                  )

                  }

                  <small>

                     (
                     {
                     product.numReviews || 0
                     }
                     )

                  </small>

               </div>

               {/* PRICE */}

               <div
                  className="d-flex justify-content-between align-items-center"
               >

                  <div>

                     <h5
                        className="fw-bold m-0"
                     >

                        ₹{

                        Number(
                           product.price
                        ).toLocaleString(
                           "en-IN"
                        )

                        }

                     </h5>

                     <small
                        className="text-success"
                     >
                        Free Delivery
                     </small>

                  </div>

                  <Link

                     to={`/product/${product._id}`}

                     className="btn btn-primary btn-sm"

                  >

                     View

                  </Link>

               </div>

            </div>

         </div>

      </div>

   );

};

export default ProductCard;