import { Link }
from "react-router-dom";

import logo
from "../../assets/logo.png";

import {
   useSelector,
   useDispatch
}
from "react-redux";

import {
   logout
}
from "../../redux/slices/authSlice";

import {

   FaShoppingCart,
   FaHeart,
   FaUserCircle,
   FaBoxOpen

} from "react-icons/fa";

const Navbar = ()=>{

   const dispatch =
   useDispatch();



   /* AUTH */

   const {userInfo} =
   useSelector(

      (state)=>state.auth

   );



   /* CART */

   const {cartItems} =
   useSelector(

      (state)=>state.cart

   );



   /* WISHLIST */

   const {wishlistItems} =
   useSelector(

      (state)=>state.wishlist

   );



   /* LOGOUT */

   const logoutHandler = ()=>{

      dispatch(logout());

   };



   return(

      <nav

         className="navbar navbar-expand-lg sticky-top shadow-sm"

         style={{

            background:"#0f172a"

         }}

      >

         <div className="container">

            {/* LOGO */}

            <Link

               className="navbar-brand d-flex align-items-center gap-2"

               to="/"

            >

               <img

                  src={logo}

                  alt="logo"

                  width="55"

                  height="55"

                  style={{

                     objectFit:"contain",
                     borderRadius:"12px",
                     background:"#fff",
                     padding:"4px"

                  }}

               />



               <span

                  className="fw-bold fs-3 text-white"

               >

                  ShopVista

               </span>

            </Link>



            {/* TOGGLE */}

            <button

               className="navbar-toggler bg-light"

               type="button"

               data-bs-toggle="collapse"

               data-bs-target="#navbarNav"

            >

               <span className="navbar-toggler-icon">

               </span>

            </button>



            {/* NAVBAR */}

            <div

               className="collapse navbar-collapse"

               id="navbarNav"

            >

               <ul

                  className="navbar-nav ms-auto align-items-lg-center gap-4"

               >

                  {/* HOME */}

                  <li className="nav-item">

                     <Link

                        className="nav-link text-white fw-semibold"

                        to="/"

                     >

                        Home

                     </Link>

                  </li>



                  {/* SHOW ONLY AFTER LOGIN */}

                  {

                  userInfo && (

                  <>

                  {/* ORDERS */}

                  <li className="nav-item">

                     <Link

                        className="nav-link text-white fw-semibold d-flex align-items-center gap-2"

                        to="/orders"

                     >

                        <FaBoxOpen />

                        Orders

                     </Link>

                  </li>



                  {/* WISHLIST */}

                  <li className="nav-item">

                     <Link

                        className="position-relative text-white text-decoration-none"

                        to="/wishlist"

                     >

                        <FaHeart size={22} />



                        {

                        wishlistItems.length > 0 && (

                        <span

                           className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"

                        >

                           {wishlistItems.length}

                        </span>

                        )

                        }

                     </Link>

                  </li>



                  {/* CART */}

                  <li className="nav-item">

                     <Link

                        className="position-relative text-white text-decoration-none"

                        to="/cart"

                     >

                        <FaShoppingCart size={24} />



                        {

                        cartItems.length > 0 && (

                        <span

                           className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"

                        >

                           {cartItems.length}

                        </span>

                        )

                        }

                     </Link>

                  </li>



                  {/* USER */}

                  <li className="nav-item d-flex align-items-center gap-2">

                     <FaUserCircle

                        className="text-white"

                        size={24}

                     />



                     <span

                        className="text-white fw-semibold"

                     >

                        {userInfo.name}

                     </span>

                  </li>



                  {/* LOGOUT */}

                  <li className="nav-item">

                     <button

                        onClick={logoutHandler}

                        className="btn btn-danger px-4"

                        style={{

                           borderRadius:"10px"

                        }}

                     >

                        Logout

                     </button>

                  </li>

                  </>

                  )

                  }



                  {/* BEFORE LOGIN */}

                  {

                  !userInfo && (

                  <li className="nav-item">

                     <Link

                        className="btn btn-success px-4 fw-semibold"

                        to="/register"

                        style={{

                           borderRadius:"10px"

                        }}

                     >

                        Sign Up

                     </Link>

                  </li>

                  )

                  }

               </ul>

            </div>

         </div>

      </nav>

   );

};

export default Navbar;