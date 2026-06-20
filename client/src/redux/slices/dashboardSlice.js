import {

   createSlice,
   createAsyncThunk

} from "@reduxjs/toolkit";



import {

   getDashboardStats

} from "../../services/adminService";



/* =========================================
   FETCH DASHBOARD
========================================= */

export const fetchDashboard =
createAsyncThunk(

   "dashboard/fetch",

   async(token,thunkAPI)=>{

      try{

         return await getDashboardStats(

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





const dashboardSlice =
createSlice({

   name:"dashboard",



   initialState:{

      stats:{},

      loading:false,

      error:null

   },



   reducers:{},



   extraReducers:(builder)=>{

      builder



      .addCase(

         fetchDashboard.pending,

         (state)=>{

            state.loading = true;

         }

      )



      .addCase(

         fetchDashboard.fulfilled,

         (state,action)=>{

            state.loading = false;

            state.stats = action.payload;

         }

      )



      .addCase(

         fetchDashboard.rejected,

         (state,action)=>{

            state.loading = false;

            state.error = action.payload;

         }

      );

   }

});



export default
dashboardSlice.reducer;