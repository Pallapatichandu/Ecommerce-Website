import {

   createSlice,
   createAsyncThunk

} from "@reduxjs/toolkit";



import {

   getUsers,
   removeUser

} from "../../services/userService";





/* =========================================
   FETCH USERS
========================================= */

export const fetchUsers =
createAsyncThunk(

   "users/fetchUsers",

   async(token,thunkAPI)=>{

      try{

         return await getUsers(

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
   DELETE USER
========================================= */

export const deleteUser =
createAsyncThunk(

   "users/deleteUser",

   async(

      {

         id,
         token

      },

      thunkAPI

   )=>{

      try{

         await removeUser(

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





const usersSlice =
createSlice({

   name:"users",



   initialState:{

      users:[],

      loading:false,

      error:null

   },



   reducers:{},



   extraReducers:(builder)=>{

      builder



      .addCase(

         fetchUsers.pending,

         (state)=>{

            state.loading = true;

         }

      )



      .addCase(

         fetchUsers.fulfilled,

         (state,action)=>{

            state.loading = false;

            state.users = action.payload;

         }

      )



      .addCase(

         fetchUsers.rejected,

         (state,action)=>{

            state.loading = false;

            state.error = action.payload;

         }

      )



      .addCase(

         deleteUser.fulfilled,

         (state,action)=>{

            state.users =

            state.users.filter(

               (user)=>

               user._id !==

               action.payload

            );

         }

      );

   }

});



export default
usersSlice.reducer;