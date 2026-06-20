import { useState } from "react";

import {
   Link,
   useNavigate
} from "react-router-dom";

import toast from "react-hot-toast";

import {
   registerUser
} from "../../services/authService";

const Register = () => {

   const navigate = useNavigate();

   const [name, setName] = useState("");

   const [email, setEmail] = useState("");

   const [password, setPassword] = useState("");



   const handleSubmit = async (e) => {

      e.preventDefault();

      try {

         const data = await registerUser({

            name,
            email,
            password

         });

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
                  width: "400px",
                  borderRadius: "15px"
               }}
            >

               <div className="text-center mb-4">

                  <h2 className="fw-bold">

                     Create Account

                  </h2>

                  <p className="text-muted">

                     Register to continue

                  </p>

               </div>



               <form onSubmit={handleSubmit}>

                  <div className="mb-3">

                     <label className="form-label">

                        Name

                     </label>

                     <input
                        type="text"
                        className="form-control p-2"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                     />

                  </div>



                  <div className="mb-3">

                     <label className="form-label">

                        Email

                     </label>

                     <input
                        type="email"
                        className="form-control p-2"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />

                  </div>



                  <div className="mb-3">

                     <label className="form-label">

                        Password

                     </label>

                     <input
                        type="password"
                        className="form-control p-2"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />

                  </div>



                  <button
                     className="btn btn-dark w-100 py-2"
                  >

                     Register

                  </button>

               </form>



               <p className="text-center mt-4">

                  Already have an account?

                  <Link
                     to="/login"
                     className="ms-1 text-decoration-none"
                  >

                     Login

                  </Link>

               </p>

            </div>

         </div>
      </>

   );

};

export default Register;