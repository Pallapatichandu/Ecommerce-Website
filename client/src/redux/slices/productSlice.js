import {

   createSlice,
   createAsyncThunk

} from "@reduxjs/toolkit";



import {

   getProducts,
   getSingleProduct,
   createReview,
   getRelatedProducts

} from "../../services/productService";



/* =========================================
   FETCH PRODUCTS
========================================= */

export const fetchProducts =
createAsyncThunk(

   "products/fetchProducts",

   async(

      _,

      thunkAPI

   )=>{

      try{

         return await getProducts();

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
   FETCH SINGLE PRODUCT
========================================= */

export const fetchSingleProduct =
createAsyncThunk(

   "products/fetchSingleProduct",

   async(

      id,

      thunkAPI

   )=>{

      try{

         return await getSingleProduct(id);

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
   RELATED PRODUCTS
========================================= */

export const fetchRelatedProducts =
createAsyncThunk(

   "products/fetchRelatedProducts",

   async(

      id,

      thunkAPI

   )=>{

      try{

         return await getRelatedProducts(id);

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
   ADD PRODUCT REVIEW
========================================= */

export const addProductReview =
createAsyncThunk(

   "products/addReview",

   async(

      {

         productId,
         reviewData,
         token

      },

      thunkAPI

   )=>{

      try{

         return await createReview(

            productId,
            reviewData,
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





const productSlice =
createSlice({

   name:"products",



   initialState:{

      products:[],

      relatedProducts:[],

      singleProduct:null,

      loading:false,

      success:false,

      error:null

   },



   reducers:{



      resetReviewState:(state)=>{

         state.success = false;

         state.error = null;

      }

   },



   extraReducers:(builder)=>{

      builder



      /* =========================================
         FETCH PRODUCTS
      ========================================= */

      .addCase(

         fetchProducts.pending,

         (state)=>{

            state.loading = true;

            state.error = null;

         }

      )



      .addCase(

         fetchProducts.fulfilled,

         (state,action)=>{

            state.loading = false;



            state.products =

            Array.isArray(

               action.payload

            )

            ?

            action.payload

            :

            [];

         }

      )



      .addCase(

         fetchProducts.rejected,

         (state,action)=>{

            state.loading = false;



            state.error =

            action.payload;

         }

      )



      /* =========================================
         SINGLE PRODUCT
      ========================================= */

      .addCase(

         fetchSingleProduct.pending,

         (state)=>{

            state.loading = true;

            state.error = null;

         }

      )



      .addCase(

         fetchSingleProduct.fulfilled,

         (state,action)=>{

            state.loading = false;



            state.singleProduct =

            action.payload;

         }

      )



      .addCase(

         fetchSingleProduct.rejected,

         (state,action)=>{

            state.loading = false;



            state.error =

            action.payload;

         }

      )



      /* =========================================
         RELATED PRODUCTS
      ========================================= */

      .addCase(

         fetchRelatedProducts.pending,

         (state)=>{

            state.loading = true;

         }

      )



      .addCase(

         fetchRelatedProducts.fulfilled,

         (state,action)=>{

            state.loading = false;



            state.relatedProducts =

            action.payload;

         }

      )



      .addCase(

         fetchRelatedProducts.rejected,

         (state,action)=>{

            state.loading = false;



            state.error =

            action.payload;

         }

      )



      /* =========================================
         ADD REVIEW
      ========================================= */

      .addCase(

         addProductReview.pending,

         (state)=>{

            state.loading = true;

         }

      )



      .addCase(

         addProductReview.fulfilled,

         (state)=>{

            state.loading = false;

            state.success = true;

         }

      )



      .addCase(

         addProductReview.rejected,

         (state,action)=>{

            state.loading = false;



            state.error =

            action.payload;

         }

      );

   }

});



export const {

   resetReviewState

} = productSlice.actions;



export default
productSlice.reducer;