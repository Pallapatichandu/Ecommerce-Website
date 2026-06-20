import {

   useState

} from "react";



import {

   Link,
   useNavigate

} from "react-router-dom";



import {

   useDispatch

} from "react-redux";



import toast
from "react-hot-toast";



import {

   loginUser

} from "../../services/authService";



import {

   setCredentials

} from "../../redux/slices/authSlice";



const Login = ()=>{

   const navigate =
   useNavigate();



   const dispatch =
   useDispatch();



   const [email,setEmail] =
   useState("");



   const [password,setPassword] =
   useState("");



   const handleSubmit =
   async(e)=>{

      e.preventDefault();



      try{

         const data =
         await loginUser({

            email,
            password

         });



         /* SAVE USER */

         dispatch(

            setCredentials(data)

         );



         toast.success(

            "Login Successful"

         );



         navigate("/");

      }

      catch(error){

         toast.error(

            error.response?.data?.message ||

            "Login Failed"

         );

      }

   };



   return(

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

                  Welcome Back

               </h2>



               <p className="text-muted">

                  Login to continue

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



               {/* PASSWORD */}

               <div className="mb-3">

                  <label className="form-label">

                     Password

                  </label>



                  <input

                     type="password"

                     className="form-control p-2"

                     placeholder="Enter password"

                     value={password}

                     onChange={(e)=>

                        setPassword(

                           e.target.value

                        )

                     }

                  />

               </div>



               {/* FORGOT PASSWORD */}

               <div className="text-end mb-3">

                  <Link

                     to="/forgot-password"

                     className="text-decoration-none"

                  >

                     Forgot Password?

                  </Link>

               </div>



               {/* BUTTON */}

               <button

                  className="btn btn-dark w-100 py-2"

               >

                  Login

               </button>

            </form>



            {/* REGISTER */}

            <p className="text-center mt-4">

               Don't have an account?



               <Link

                  to="/register"

                  className="ms-1 text-decoration-none"

               >

                  Register

               </Link>

            </p>

         </div>

      </div>

   );

};



export default Login;