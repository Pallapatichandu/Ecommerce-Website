import {

   configureStore

} from "@reduxjs/toolkit";



import authReducer
from "./slices/authSlice";



import productReducer
from "./slices/productSlice";



import cartReducer
from "./slices/cartSlice";







import orderReducer
from "./slices/orderSlice";



import adminReducer
from "./slices/adminSlice";
import wishlistReducer
from "./slices/wishlistSlice";

import dashboardReducer
from "./slices/dashboardSlice";
import salesReducer
from "./slices/salesSlice";
import usersReducer
from "./slices/usersSlice";









export const store =
configureStore({

   reducer:{

      auth:authReducer,

      products:productReducer,

      cart:cartReducer,

      wishlist:wishlistReducer,

      orders:orderReducer,

      admin:adminReducer,
      wishlist:wishlistReducer,
      dashboard:dashboardReducer,
      sales:salesReducer,
      users:usersReducer
      

   }

});