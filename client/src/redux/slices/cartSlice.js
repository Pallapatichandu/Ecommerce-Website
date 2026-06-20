import {

   createSlice,
   createAsyncThunk

} from "@reduxjs/toolkit";



import {

   addCart,
   getCart,
   removeCart,
   increaseCartQty,
   decreaseCartQty

} from "../../services/cartService";



/* =========================================
   FETCH CART
========================================= */

export const fetchCart =
createAsyncThunk(

   "cart/fetchCart",

   async(token,thunkAPI)=>{

      try{

         return await getCart(token);

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
   ADD TO CART
========================================= */

export const addToCart =
createAsyncThunk(

   "cart/addToCart",

   async(

      {

         productId,
         quantity,
         variants,
         token

      },

      thunkAPI

   )=>{

      try{

         return await addCart(

            {

               productId,
               quantity,
               variants

            },

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
   REMOVE FROM CART
========================================= */

export const removeFromCart =
createAsyncThunk(

   "cart/removeFromCart",

   async(

      {

         id,
         token

      },

      thunkAPI

   )=>{

      try{

         await removeCart(

            id,
            token

         );



         return id;

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
   INCREASE QUANTITY
========================================= */

export const increaseQty =
createAsyncThunk(

   "cart/increaseQty",

   async(

      {

         id,
         token

      },

      thunkAPI

   )=>{

      try{

         return await increaseCartQty(

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





/* =========================================
   DECREASE QUANTITY
========================================= */

export const decreaseQty =
createAsyncThunk(

   "cart/decreaseQty",

   async(

      {

         id,
         token

      },

      thunkAPI

   )=>{

      try{

         return await decreaseCartQty(

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





const cartSlice =
createSlice({

   name:"cart",



   initialState:{

      cartItems:[],

      loading:false,

      error:null

   },



   /* =========================================
      REDUCERS
   ========================================= */

   reducers:{

      resetCart:(state)=>{

         state.cartItems = [];

      }

   },



   /* =========================================
      EXTRA REDUCERS
   ========================================= */

   extraReducers:(builder)=>{

      builder



      /* FETCH CART */

      .addCase(

         fetchCart.fulfilled,

         (state,action)=>{

            state.cartItems =

            action.payload;

         }

      )



      /* ADD TO CART */

      .addCase(

         addToCart.fulfilled,

         (state,action)=>{

            const exists =

            state.cartItems.find(

               (item)=>

               item._id ===

               action.payload._id

            );



            if(exists){

               state.cartItems =

               state.cartItems.map(

                  (item)=>

                  item._id ===

                  action.payload._id

                  ?

                  action.payload

                  :

                  item

               );

            }

            else{

               state.cartItems.push(

                  action.payload

               );

            }

         }

      )



      /* REMOVE */

      .addCase(

         removeFromCart.fulfilled,

         (state,action)=>{

            state.cartItems =

            state.cartItems.filter(

               (item)=>

               item._id !==

               action.payload

            );

         }

      )



      /* INCREASE */

      .addCase(

         increaseQty.fulfilled,

         (state,action)=>{

            state.cartItems =

            state.cartItems.map(

               (item)=>

               item._id ===

               action.payload._id

               ?

               action.payload

               :

               item

            );

         }

      )



      /* DECREASE */

      .addCase(

         decreaseQty.fulfilled,

         (state,action)=>{

            state.cartItems =

            state.cartItems.map(

               (item)=>

               item._id ===

               action.payload._id

               ?

               action.payload

               :

               item

            );

         }

      );

   }

});



/* =========================================
   EXPORT ACTIONS
========================================= */

export const {

   resetCart

} = cartSlice.actions;



export default
cartSlice.reducer;