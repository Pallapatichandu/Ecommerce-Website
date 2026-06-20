import { Outlet } from "react-router-dom";

import Navbar
from "../components/common/Navbar";

import Footer
from "../components/common/Footer";

const MainLayout = () => {

   return (

      <div
         className="d-flex flex-column"
         style={{
            minHeight:"100vh"
         }}
      >

         {/* NAVBAR */}

         <Navbar />

         {/* PAGE CONTENT */}

         <main
            className="flex-grow-1"
         >

            <Outlet />

         </main>

         {/* FOOTER */}

         <Footer />

      </div>

   );

};

export default MainLayout;