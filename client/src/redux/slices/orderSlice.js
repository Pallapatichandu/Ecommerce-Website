import {

   createSlice,
   createAsyncThunk

} from "@reduxjs/toolkit";



import {

   createOrder,
   getMyOrders,
   getSingleOrder

} from "../../services/orderService";





/* =========================================
   CREATE ORDER
========================================= */

export const placeOrder =
createAsyncThunk(

   "orders/placeOrder",

   async(

      {

         orderData,
         token

      },

      thunkAPI

   )=>{

      try{

         return await createOrder(

            orderData,
            token

         );

      }

      catch(error){

         return thunkAPI.rejectWithValue(

            error.response?.data?.message ||

            error.message

         );

      }

   }

);





/* =========================================
   GET MY ORDERS
========================================= */

export const fetchMyOrders =
createAsyncThunk(

   "orders/fetchMyOrders",

   async(token,thunkAPI)=>{

      try{

         return await getMyOrders(

            token

         );

      }

      catch(error){

         return thunkAPI.rejectWithValue(

            error.response?.data?.message ||

            error.message

         );

      }

   }

);





/* =========================================
   GET SINGLE ORDER
========================================= */

export const fetchSingleOrder =
createAsyncThunk(

   "orders/fetchSingleOrder",

   async(

      {

         id,
         token

      },

      thunkAPI

   )=>{

      try{

         return await getSingleOrder(

            id,
            token

         );

      }

      catch(error){

         return thunkAPI.rejectWithValue(

            error.response?.data?.message ||

            error.message

         );

      }

   }

);





const orderSlice =
createSlice({

   name:"orders",



   initialState:{

      orders:[],

      singleOrder:null,

      loading:false,

      error:null,

      success:false

   },



   reducers:{

      /* RESET */

      resetOrderState:(state)=>{

         state.loading = false;

         state.error = null;

         state.success = false;

      }

   },



   extraReducers:(builder)=>{

      builder



      /* =========================================
         CREATE ORDER
      ========================================= */

      .addCase(

         placeOrder.pending,

         (state)=>{

            state.loading = true;

            state.error = null;

         }

      )



      .addCase(

         placeOrder.fulfilled,

         (state,action)=>{

            state.loading = false;

            state.success = true;



            /* ADD NEW ORDER */

            state.orders.unshift(

               action.payload

            );

         }

      )



      .addCase(

         placeOrder.rejected,

         (state,action)=>{

            state.loading = false;

            state.error =

            action.payload;

         }

      )



      /* =========================================
         FETCH MY ORDERS
      ========================================= */

      .addCase(

         fetchMyOrders.pending,

         (state)=>{

            state.loading = true;

            state.error = null;

         }

      )



      .addCase(

         fetchMyOrders.fulfilled,

         (state,action)=>{

            state.loading = false;



            state.orders =

            action.payload;

         }

      )



      .addCase(

         fetchMyOrders.rejected,

         (state,action)=>{

            state.loading = false;

            state.error =

            action.payload;

         }

      )



      /* =========================================
         FETCH SINGLE ORDER
      ========================================= */

      .addCase(

         fetchSingleOrder.pending,

         (state)=>{

            state.loading = true;

         }

      )



      .addCase(

         fetchSingleOrder.fulfilled,

         (state,action)=>{

            state.loading = false;



            state.singleOrder =

            action.payload;

         }

      )



      .addCase(

         fetchSingleOrder.rejected,

         (state,action)=>{

            state.loading = false;

            state.error =

            action.payload;

         }

      );

   }

});





export const {

   resetOrderState

} = orderSlice.actions;



export default
orderSlice.reducer;