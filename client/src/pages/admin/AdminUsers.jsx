import {

   useEffect,
   useState

} from "react";



import {

   useDispatch,
   useSelector

} from "react-redux";



import {

   fetchUsers,
   deleteUser

} from "../../redux/slices/usersSlice";



import toast
from "react-hot-toast";





const AdminUsers = ()=>{

   const dispatch =
   useDispatch();



   const {

      users = []

   } = useSelector(

      (state)=>state.users

   );



   const {userInfo} =
   useSelector(

      (state)=>state.auth

   );



   /* SEARCH */

   const [search,setSearch] =
   useState("");



   /* FILTER */

   const [roleFilter,setRoleFilter] =
   useState("All");



   /* FETCH USERS */

   useEffect(()=>{

      dispatch(

         fetchUsers(

            userInfo.token

         )

      );

   },[dispatch,userInfo]);



   /* DELETE USER */

   const deleteHandler =
   async(id)=>{

      if(

         window.confirm(

            "Delete User ?"

         )

      ){

         try{

            await dispatch(

               deleteUser({

                  id,
                  token:userInfo.token

               })

            ).unwrap();



            toast.success(

               "User Deleted"

            );

         }

         catch(error){

            toast.error(error);

         }

      }

   };



   /* FILTER USERS */

   const filteredUsers =
   users.filter((user)=>{

      const matchSearch =

         user.name

         .toLowerCase()

         .includes(

            search.toLowerCase()

         )

         ||

         user.email

         .toLowerCase()

         .includes(

            search.toLowerCase()

         );



      const matchRole =

         roleFilter === "All"

         ||

         (

            roleFilter === "Admin"

            &&

            user.role === "admin"

         )

         ||

         (

            roleFilter === "User"

            &&

            user.role !== "admin"

         );



      return (

         matchSearch &&

         matchRole

      );

   });





   return(

      <div className="container-fluid py-4">

         {/* HEADER */}

         <div className="d-flex justify-content-between align-items-center mb-4">

            <h2 className="fw-bold">

               Users

            </h2>

         </div>



         {/* SEARCH + FILTER */}

         <div className="row mb-4">

            {/* SEARCH */}

            <div className="col-md-6 mb-3">

               <input

                  type="text"

                  placeholder="Search users..."

                  className="form-control"

                  value={search}

                  onChange={(e)=>

                     setSearch(

                        e.target.value

                     )

                  }

               />

            </div>



            {/* FILTER */}

            <div className="col-md-3 mb-3">

               <select

                  className="form-select"

                  value={roleFilter}

                  onChange={(e)=>

                     setRoleFilter(

                        e.target.value

                     )

                  }

               >

                  <option>

                     All

                  </option>



                  <option>

                     Admin

                  </option>



                  <option>

                     User

                  </option>

               </select>

            </div>

         </div>



         {/* TABLE */}

         <div className="card border-0 shadow-sm">

            <div className="table-responsive">

               <table className="table align-middle mb-0">

                  <thead className="table-dark">

                     <tr>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Role</th>

                        <th>Action</th>

                     </tr>

                  </thead>



                  <tbody>

                     {

                     filteredUsers.length === 0

                     ?

                     (

                        <tr>

                           <td

                              colSpan="4"

                              className="text-center py-4"

                           >

                              No Users Found

                           </td>

                        </tr>

                     )

                     :

                     (

                        filteredUsers.map((user)=>(

                           <tr key={user._id}>

                              {/* NAME */}

                              <td>

                                 <h6 className="fw-bold mb-0">

                                    {user.name}

                                 </h6>

                              </td>



                              {/* EMAIL */}

                              <td>

                                 {user.email}

                              </td>



                              {/* ROLE */}

                              <td>

                                 {

                                 user.role === "admin"

                                 ?

                                 <span className="badge bg-success">

                                    Admin

                                 </span>

                                 :

                                 <span className="badge bg-secondary">

                                    User

                                 </span>

                                 }

                              </td>



                              {/* DELETE */}

                              <td>

                                 <button

                                    onClick={()=>

                                       deleteHandler(

                                          user._id

                                       )

                                    }

                                    className="btn btn-danger btn-sm"

                                 >

                                    Delete

                                 </button>

                              </td>

                           </tr>

                        ))

                     )

                     }

                  </tbody>

               </table>

            </div>

         </div>

      </div>

   );

};



export default AdminUsers;