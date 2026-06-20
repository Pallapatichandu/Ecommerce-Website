import {

   createSlice,
   createAsyncThunk

} from "@reduxjs/toolkit";



import {

   getWishlist,
   addWishlist,
   removeWishlist

} from "../../services/wishlistService";



/* =========================================
   FETCH WISHLIST
========================================= */

export const fetchWishlist =
createAsyncThunk(

   "wishlist/fetchWishlist",

   async(token,thunkAPI)=>{

      try{

         return await getWishlist(token);

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
   ADD TO WISHLIST
========================================= */

export const addToWishlist =
createAsyncThunk(

   "wishlist/addToWishlist",

   async(

      {

         productId,
         token

      },

      thunkAPI

   )=>{

      try{

         return await addWishlist(

            productId,
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
   DELETE WISHLIST
========================================= */

export const deleteWishlist =
createAsyncThunk(

   "wishlist/deleteWishlist",

   async(

      {

         id,
         token

      },

      thunkAPI

   )=>{

      try{

         await removeWishlist(

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





const wishlistSlice =
createSlice({

   name:"wishlist",



   initialState:{

      wishlistItems:[],

      loading:false,

      error:null

   },



   reducers:{},



   extraReducers:(builder)=>{

      builder



      /* FETCH */

      .addCase(

         fetchWishlist.pending,

         (state)=>{

            state.loading = true;

         }

      )



      .addCase(

         fetchWishlist.fulfilled,

         (state,action)=>{

            state.loading = false;



            state.wishlistItems =

            action.payload;

         }

      )



      .addCase(

         fetchWishlist.rejected,

         (state,action)=>{

            state.loading = false;



            state.error =

            action.payload;

         }

      )



      /* ADD */

      .addCase(

         addToWishlist.fulfilled,

         (state,action)=>{

            const exists =

            state.wishlistItems.find(

               (item)=>

               item._id ===

               action.payload._id

            );



            if(!exists){

               state.wishlistItems.push(

                  action.payload

               );

            }

         }

      )



      /* DELETE */

      .addCase(

         deleteWishlist.fulfilled,

         (state,action)=>{

            state.wishlistItems =

            state.wishlistItems.filter(

               (item)=>

               item._id !==

               action.payload

            );

         }

      );

   }

});



export default
wishlistSlice.reducer;