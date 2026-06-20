import { useState } from "react";

import {
   useParams,
   useNavigate
} from "react-router-dom";

import toast from "react-hot-toast";

import api from "../../services/api";

const ResetPassword = () => {

   const { token } = useParams();

   const navigate = useNavigate();

   const [password, setPassword] =
      useState("");



   const handleSubmit = async (e) => {

      e.preventDefault();

      try {

         const { data } = await api.put(

            `/auth/reset-password/${token}`,

            { password }

         );



         toast.success(data.message);

         navigate("/login");

      }

      catch (error) {

         toast.error(

            error.response?.data?.message ||

            "Something went wrong"

         );

      }

   };



   return (

      <div
         className="d-flex justify-content-center align-items-center vh-100"
         style={{
            background:
               "linear-gradient(to right,#141e30,#243b55)"
         }}
      >

         <div
            className="card p-4 shadow-lg border-0"
            style={{
               width: "400px",
               borderRadius: "15px"
            }}
         >

            <h2 className="text-center mb-4">

               Reset Password

            </h2>



            <form onSubmit={handleSubmit}>

               <div className="mb-3">

                  <label className="form-label">

                     New Password

                  </label>

                  <input
                     type="password"
                     className="form-control p-2"
                     placeholder="Enter new password"
                     value={password}
                     onChange={(e) =>
                        setPassword(
                           e.target.value
                        )
                     }
                  />

               </div>



               <button
                  className="btn btn-dark w-100"
               >

                  Reset Password

               </button>

            </form>

         </div>

      </div>

   );

};

export default ResetPassword;