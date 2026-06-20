
import {
   useState,
   useEffect
} from "react";

import api from "../../services/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Coupons = ()=>{

   const { userInfo } =
   useSelector(
      (state)=>state.auth
   );

   const [products,setProducts] =
   useState([]);

   const [coupons,setCoupons] =
   useState([]);

   const [couponData,setCouponData] =
   useState({

      code:"",
      discount:"",
      expireDate:"",
      product:"",
      category:"",
      minAmount:""

   });

   /* FETCH PRODUCTS */

   useEffect(()=>{

      const fetchProducts =
      async()=>{

         try{

            const {data} =
            await api.get("/products");

            setProducts(data);

         }

         catch(error){

            console.log(error);

         }

      };

      fetchProducts();

      fetchCoupons();

   },[]);

   /* FETCH COUPONS */

   const fetchCoupons =
   async()=>{

      try{

         const {data} =
         await api.get(

            "/coupon",

            {

               headers:{

                  Authorization:
                  `Bearer ${userInfo.token}`

               }

            }

         );

         setCoupons(data);

      }

      catch(error){

         console.log(error);

      }

   };

   /* HANDLE CHANGE */

   const handleChange = (e)=>{

      setCouponData({

         ...couponData,

         [e.target.name]:
         e.target.value

      });

   };

   /* CREATE COUPON */

   const submitHandler =
   async(e)=>{

      e.preventDefault();

      try{

         await api.post(

            "/coupon",

            couponData,

            {

               headers:{

                  Authorization:
                  `Bearer ${userInfo.token}`

               }

            }

         );

         toast.success(
            "Coupon Created"
         );

         setCouponData({

            code:"",
            discount:"",
            expireDate:"",
            product:"",
            category:"",
            minAmount:""

         });

         fetchCoupons();

      }

      catch(error){

         toast.error(

            error.response?.data?.message ||

            "Failed"

         );

      }

   };

   /* DELETE COUPON */

   const deleteCoupon =
   async(id)=>{

      try{

         await api.delete(

            `/coupon/${id}`,

            {

               headers:{

                  Authorization:
                  `Bearer ${userInfo.token}`

               }

            }

         );

         toast.success(
            "Coupon Deleted"
         );

         fetchCoupons();

      }

      catch(error){

         toast.error(
            "Delete Failed"
         );

      }

   };

   return(

      <div className="container py-5">

         <div className="row">

            {/* CREATE COUPON */}

            <div className="col-lg-4">

               <div className="card shadow-sm border-0 p-4">

                  <h3 className="fw-bold mb-4">

                     Create Coupon

                  </h3>

                  <form onSubmit={submitHandler}>

                     <div className="mb-3">

                        <label>
                           Coupon Code
                        </label>

                        <input
                           type="text"
                           name="code"
                           value={couponData.code}
                           onChange={handleChange}
                           className="form-control"
                           required
                        />

                     </div>

                     <div className="mb-3">

                        <label>
                           Discount %
                        </label>

                        <input
                           type="number"
                           name="discount"
                           value={couponData.discount}
                           onChange={handleChange}
                           className="form-control"
                           required
                        />

                     </div>

                     <div className="mb-3">

                        <label>
                           Expire Date
                        </label>

                        <input
                           type="date"
                           name="expireDate"
                           value={couponData.expireDate}
                           onChange={handleChange}
                           className="form-control"
                           required
                        />

                     </div>

                     <div className="mb-3">

                        <label>
                           Product
                        </label>

                        <select
                           name="product"
                           value={couponData.product}
                           onChange={handleChange}
                           className="form-select"
                        >

                           <option value="">
                              Select Product
                           </option>

                           {
                              products.map((product)=>(
                                 <option
                                    key={product._id}
                                    value={product._id}
                                 >
                                    {product.title}
                                 </option>
                              ))
                           }

                        </select>

                     </div>

                     <div className="mb-3">

                        <label>
                           Category
                        </label>

                        <input
                           type="text"
                           name="category"
                           value={couponData.category}
                           onChange={handleChange}
                           className="form-control"
                        />

                     </div>

                     <div className="mb-4">

                        <label>
                           Minimum Amount
                        </label>

                        <input
                           type="number"
                           name="minAmount"
                           value={couponData.minAmount}
                           onChange={handleChange}
                           className="form-control"
                        />

                     </div>

                     <button
                        className="btn btn-success w-100"
                     >
                        Create Coupon
                     </button>

                  </form>

               </div>

            </div>

            {/* COUPON LIST */}

            <div className="col-lg-8">

               <div className="card shadow-sm border-0 p-4">

                  <h3 className="fw-bold mb-4">

                     All Coupons

                  </h3>

                  <div className="table-responsive">

                     <table className="table table-bordered">

                        <thead className="table-dark">

                           <tr>

                              <th>Code</th>
                              <th>Discount</th>
                              <th>Category</th>
                              <th>Min Amount</th>
                              <th>Expire Date</th>
                              <th>Action</th>

                           </tr>

                        </thead>

                        <tbody>

                           {
                              coupons.map((coupon)=>(

                                 <tr key={coupon._id}>

                                    <td>
                                       {coupon.code}
                                    </td>

                                    <td>
                                       {coupon.discount}%
                                    </td>

                                    <td>
                                       {coupon.category || "-"}
                                    </td>

                                    <td>
                                       ₹{coupon.minAmount}
                                    </td>

                                    <td>

                                       {
                                          new Date(
                                             coupon.expireDate
                                          ).toLocaleDateString()
                                       }

                                    </td>

                                    <td>

                                       <button

                                          className="btn btn-danger btn-sm"

                                          onClick={()=>
                                             deleteCoupon(
                                                coupon._id
                                             )
                                          }

                                       >

                                          Delete

                                       </button>

                                    </td>

                                 </tr>

                              ))
                           }

                        </tbody>

                     </table>

                  </div>

               </div>

            </div>

         </div>

      </div>

   );

};

export default Coupons;

