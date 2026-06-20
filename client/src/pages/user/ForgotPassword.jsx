import { useState } from "react";

import {
   Link
} from "react-router-dom";

import toast from "react-hot-toast";

import {
   forgotPassword
} from "../../services/authService";

const ForgotPassword = ()=>{

   const [email,setEmail] =
   useState("");



   const handleSubmit = async(e)=>{

      e.preventDefault();

      try{

         const data =await forgotPassword(email);

         toast.success(

            data.message

         );

      }

      catch(error){

         toast.error(

            error.response?.data?.message ||

            "Something went wrong"

         );

      }

   };



   return(

      <>

         <div

            className="d-flex justify-content-center align-items-center vh-100"

            style={{

               background:
               "linear-gradient(to right,#141e30,#243b55)"

            }}

         >

            <div

               className="card shadow-lg p-4 border-0"

               style={{

                  width:"400px",
                  borderRadius:"15px"

               }}

            >

               <div className="text-center mb-4">

                  <h2 className="fw-bold">

                     Forgot Password

                  </h2>



                  <p className="text-muted">

                     Enter your email

                  </p>

               </div>



               <form onSubmit={handleSubmit}>

                  {/* EMAIL */}

                  <div className="mb-3">

                     <label className="form-label">

                        Email

                     </label>



                     <input

                        type="email"

                        className="form-control p-2"

                        placeholder="Enter email"

                        value={email}

                        onChange={(e)=>

                           setEmail(

                              e.target.value

                           )

                        }

                     />

                  </div>



                  {/* BUTTON */}

                  <button

                     className="btn btn-dark w-100 py-2"

                  >

                     Send Reset Link

                  </button>

               </form>



               {/* LOGIN */}

               <p className="text-center mt-4">

                  <Link

                     to="/login"

                     className="text-decoration-none"

                  >

                     Back To Login

                  </Link>

               </p>

            </div>

         </div>

      </>

   );

};

export default ForgotPassword;