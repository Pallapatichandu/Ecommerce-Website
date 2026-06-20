import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";



/* =========================================
   FETCH ADMIN PRODUCTS
========================================= */

export const fetchAdminProducts = createAsyncThunk("admin/fetchAdminProducts",

   async (token, thunkAPI) => {

      try {

         const { data } = await api.get("/products", {

            headers: {

               Authorization:

                  `Bearer ${token}`

            }

         }

         );



         return data;

      }

      catch (error) {

         return thunkAPI.rejectWithValue(

            error.response?.data?.message ||

            error.message

         );

      }

   }

);





/* =========================================
   CREATE PRODUCT
========================================= */

export const createProduct = createAsyncThunk("admin/createProduct",

   async ({ formData, token }, thunkAPI) => {

      try {

         const response = await fetch("http://localhost:8000/api/products",

            {

               method: "POST",

               headers: {

                  Authorization:

                     `Bearer ${token}`

               },

               body: formData

            }

         );



         const data = await response.json();



         if (!response.ok) {

            throw new Error(

               data.message

            );

         }



         return data;

      }

      catch (error) {

         return thunkAPI.rejectWithValue(

            error.message

         );

      }

   }

);





/* =========================================
   DELETE PRODUCT
========================================= */

export const deleteProduct = createAsyncThunk("admin/deleteProduct",

   async ({ id, token }, thunkAPI) => {

      try {

         await api.delete(`/products/${id}`,

            {

               headers: {

                  Authorization:

                     `Bearer ${token}`

               }

            }

         );



         return id;

      }

      catch (error) {

         return thunkAPI.rejectWithValue(

            error.response?.data?.message ||

            error.message

         );

      }

   }

);





/* =========================================
   FETCH ORDERS
========================================= */

export const fetchOrders =
   createAsyncThunk(

      "admin/fetchOrders",

      async (token, thunkAPI) => {

         try {

            const { data } =
               await api.get(

                  "/admin/orders",

                  {

                     headers: {

                        Authorization:

                           `Bearer ${token}`

                     }

                  }

               );



            return data;

         }

         catch (error) {

            return thunkAPI.rejectWithValue(

               error.response?.data?.message ||

               error.message

            );

         }

      }

   );





/* =========================================
   UPDATE ORDER STATUS
========================================= */

export const changeOrderStatus =
   createAsyncThunk(

      "admin/changeOrderStatus",

      async (

         {

            id,
            orderStatus,
            token

         },

         thunkAPI

      ) => {

         try {

            const { data } =
               await api.put(

                  `/admin/orders/${id}`,

                  {

                     orderStatus

                  },

                  {

                     headers: {

                        Authorization:

                           `Bearer ${token}`

                     }

                  }

               );



            return data;

         }

         catch (error) {

            return thunkAPI.rejectWithValue(

               error.response?.data?.message ||

               error.message

            );

         }

      }

   );





const adminSlice =createSlice({

      name: "admin",



      initialState: {

         products: [],

         orders: [],

         loading: false,

         success: false,

         error: null

      },



      reducers: {

         resetAdminState: (state) => {

            state.loading = false;

            state.success = false;

            state.error = null;

         }

      },



      extraReducers: (builder) => {

         builder



            /* =========================================
               FETCH PRODUCTS
            ========================================= */

            .addCase(

               fetchAdminProducts.pending,

               (state) => {

                  state.loading = true;

                  state.error = null;

               }

            )



            .addCase(

               fetchAdminProducts.fulfilled,

               (state, action) => {

                  state.loading = false;



                  state.products =

                     action.payload.products ||

                     action.payload;

               }

            )



            .addCase(

               fetchAdminProducts.rejected,

               (state, action) => {

                  state.loading = false;



                  state.error = action.payload;

               }

            )



            /* =========================================
               CREATE PRODUCT
            ========================================= */

            .addCase(

               createProduct.pending,

               (state) => {

                  state.loading = true;

                  state.error = null;

                  state.success = false;

               }

            )



            .addCase(

               createProduct.fulfilled,

               (state, action) => {

                  state.loading = false;

                  state.success = true;



                  state.products.unshift(

                     action.payload

                  );

               }

            )



            .addCase(

               createProduct.rejected,

               (state, action) => {

                  state.loading = false;

                  state.success = false;



                  state.error = action.payload;

               }

            )



            /* =========================================
               DELETE PRODUCT
            ========================================= */

            .addCase(

               deleteProduct.pending,

               (state) => {

                  state.loading = true;

                  state.error = null;

               }

            )



            .addCase(

               deleteProduct.fulfilled,

               (state, action) => {

                  state.loading = false;



                  state.products =

                     state.products.filter(

                        (item) =>

                           item._id !==

                           action.payload

                     );

               }

            )



            .addCase(

               deleteProduct.rejected,

               (state, action) => {

                  state.loading = false;



                  state.error = action.payload;

               }

            )



            /* =========================================
               FETCH ORDERS
            ========================================= */

            .addCase(

               fetchOrders.pending,

               (state) => {

                  state.loading = true;

               }

            )



            .addCase(

               fetchOrders.fulfilled,

               (state, action) => {

                  state.loading = false;

                  state.orders = action.payload;

               }

            )



            .addCase(

               fetchOrders.rejected,

               (state, action) => {

                  state.loading = false;

                  state.error = action.payload;

               }

            )



            /* =========================================
               UPDATE ORDER STATUS
            ========================================= */

            .addCase(

               changeOrderStatus.fulfilled,

               (state, action) => {

                  const index =

                     state.orders.findIndex(

                        (order) =>

                           order._id ===

                           action.payload.order._id

                     );



                  if (index !== -1) {

                     state.orders[index] =action.payload.order;

                  }

               }

            );

      }

   });



export const { resetAdminState} = adminSlice.actions;



export default adminSlice.reducer;