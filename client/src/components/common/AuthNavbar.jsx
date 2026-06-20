import { Link }
from "react-router-dom";

const AuthNavbar = ()=>{

   return(

      <nav className="navbar navbar-dark bg-dark px-4 py-3">

         <div className="container">

            <Link
               to="/"
               className="navbar-brand fw-bold fs-3"
            >

               MERN SHOP

            </Link>

         </div>

      </nav>

   );

};

export default AuthNavbar;