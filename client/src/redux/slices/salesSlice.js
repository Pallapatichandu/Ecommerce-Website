import {

   createSlice,
   createAsyncThunk

} from "@reduxjs/toolkit";



import {

   getSalesReport

} from "../../services/adminService";





/* =========================================
   FETCH SALES REPORT
========================================= */

export const fetchSalesReport =
createAsyncThunk(

   "sales/fetchReport",

   async(token,thunkAPI)=>{

      try{

         return await getSalesReport(

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





const salesSlice =
createSlice({

   name:"sales",



   initialState:{

      report:{},

      loading:false,

      error:null

   },



   reducers:{},



   extraReducers:(builder)=>{

      builder



      .addCase(

         fetchSalesReport.pending,

         (state)=>{

            state.loading = true;

         }

      )



      .addCase(

         fetchSalesReport.fulfilled,

         (state,action)=>{

            state.loading = false;

            state.report = action.payload;

         }

      )



      .addCase(

         fetchSalesReport.rejected,

         (state,action)=>{

            state.loading = false;

            state.error = action.payload;

         }

      );

   }

});



export default
salesSlice.reducer;