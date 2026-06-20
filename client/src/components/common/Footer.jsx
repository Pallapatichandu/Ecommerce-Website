import {
   FaFacebookF,
   FaInstagram,
   FaTwitter,
   FaLinkedinIn,
   FaPhoneAlt,
   FaEnvelope,
   FaMapMarkerAlt
} from "react-icons/fa";

const Footer = () => {

   return (

      <footer
         className="mt-5"
         style={{
            background:"#111827",
            color:"#ffffff"
         }}
      >

         <div className="container py-5">

            <div className="row g-4">

               {/* LOGO */}

               <div className="col-lg-4">

                  <h2
                     className="fw-bold mb-3"
                  >
                     CHANDU STORE
                  </h2>

                  <p
                     style={{
                        color:"#d1d5db",
                        lineHeight:"28px"
                     }}
                  >
                     Your trusted ecommerce
                     destination for mobiles,
                     electronics, fashion and
                     premium products.
                  </p>

                  <div className="d-flex gap-3 mt-4">

                     <a
                        href="#"
                        className="text-white"
                     >
                        <FaFacebookF size={18}/>
                     </a>

                     <a
                        href="#"
                        className="text-white"
                     >
                        <FaInstagram size={18}/>
                     </a>

                     <a
                        href="#"
                        className="text-white"
                     >
                        <FaTwitter size={18}/>
                     </a>

                     <a
                        href="#"
                        className="text-white"
                     >
                        <FaLinkedinIn size={18}/>
                     </a>

                  </div>

               </div>

               {/* QUICK LINKS */}

               <div className="col-lg-2">

                  <h5 className="fw-bold mb-3">
                     Quick Links
                  </h5>

                  <ul
                     className="list-unstyled"
                  >

                     <li className="mb-2">
                        Home
                     </li>

                     <li className="mb-2">
                        Products
                     </li>

                     <li className="mb-2">
                        Cart
                     </li>

                     <li className="mb-2">
                        Wishlist
                     </li>

                     <li className="mb-2">
                        Orders
                     </li>

                  </ul>

               </div>

               {/* CATEGORIES */}

               <div className="col-lg-3">

                  <h5 className="fw-bold mb-3">
                     Categories
                  </h5>

                  <ul
                     className="list-unstyled"
                  >

                     <li className="mb-2">
                        Mobiles
                     </li>

                     <li className="mb-2">
                        Laptops
                     </li>

                     <li className="mb-2">
                        Fashion
                     </li>

                     <li className="mb-2">
                        Accessories
                     </li>

                     <li className="mb-2">
                        Electronics
                     </li>

                  </ul>

               </div>

               {/* CONTACT */}

               <div className="col-lg-3">

                  <h5 className="fw-bold mb-3">
                     Contact
                  </h5>

                  <p>
                     <FaMapMarkerAlt />
                     {" "}
                     Hyderabad, India
                  </p>

                  <p>
                     <FaPhoneAlt />
                     {" "}
                     +91 9505886990
                  </p>

                  <p>
                     <FaEnvelope />
                     {" "}
                     support@chandustore.com
                  </p>

               </div>

            </div>

         </div>

         <div
            style={{
               borderTop:
               "1px solid #374151"
            }}
         >

            <div
               className="container py-3 text-center"
            >

               <small
                  style={{
                     color:"#9ca3af"
                  }}
               >
                  © 2026 CHANDU STORE.
                  All Rights Reserved.
               </small>

            </div>

         </div>

      </footer>

   );

};

export default Footer;