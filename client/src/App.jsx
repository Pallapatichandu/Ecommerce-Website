import React,
{
   useEffect
}
from "react";







import AppRoutes
from "./routes/AppRoutes";



import {

   useDispatch,
   useSelector

} from "react-redux";



import {

   fetchCart

} from "./redux/slices/cartSlice";



import {

   fetchWishlist

} from "./redux/slices/wishlistSlice";



const App = ()=>{

   const dispatch =
   useDispatch();



   const {userInfo} =
   useSelector(

      (state)=>state.auth

   );



   useEffect(()=>{

      if(userInfo?.token){

         dispatch(

            fetchCart(

               userInfo.token

            )

         );



         dispatch(

            fetchWishlist(

               userInfo.token

            )

         );

      }

   },[dispatch,userInfo]);



   return(

      <>

        

         <AppRoutes />

      </>

   );

};



export default App;