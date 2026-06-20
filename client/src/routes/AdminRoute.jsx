import {

   Navigate,
   Outlet

} from "react-router-dom";



import {

   useSelector

} from "react-redux";



const AdminRoute = ()=>{

   const {userInfo} =
   useSelector(

      (state)=>state.auth

   );



   console.log(userInfo);



   if(

      !userInfo ||

      userInfo.role !== "admin"

   ){

      return <Navigate to="/" />;

   }



   return <Outlet />;

};



export default AdminRoute;