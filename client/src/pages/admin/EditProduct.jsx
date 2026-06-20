import {

   useEffect,
   useState

} from "react";



import {

   useNavigate,
   useParams

} from "react-router-dom";



import {

   useDispatch,
   useSelector

} from "react-redux";



import toast
from "react-hot-toast";



import api
from "../../services/api";



import {

   fetchSingleProduct

} from "../../redux/slices/productSlice";



const EditProduct = ()=>{

   const {id} =
   useParams();



   const navigate =
   useNavigate();



   const dispatch =
   useDispatch();



   const {singleProduct} =
   useSelector(

      (state)=>state.products

   );



   const {userInfo} =
   useSelector(

      (state)=>state.auth

   );



   /* =========================================
      STATES
   ========================================= */

   const [title,setTitle] =
   useState("");



   const [price,setPrice] =
   useState("");
   const [discount,setDiscount] =
useState("");


   const [category,setCategory] =
   useState("");



   const [stock,setStock] =
   useState("");



   const [description,setDescription] =
   useState("");



   const [images,setImages] =
   useState([]);




   const [highlights,setHighlights] =
   useState([""]);




   const [variants,setVariants] =
   useState([

      {

         type:"",
         value:"",
         price:"",
         stock:""

      }

   ]);



   /* =========================================
      FETCH PRODUCT
   ========================================= */

   useEffect(()=>{

      dispatch(

         fetchSingleProduct(id)

      );

   },[dispatch,id]);



   /* =========================================
      SET PRODUCT DATA
   ========================================= */

   useEffect(()=>{

      if(singleProduct){

         setTitle(

            singleProduct.title || ""

         );



         setPrice(

            singleProduct.price || ""

         );

         setDiscount(
   singleProduct.discount || ""
);



         setCategory(

            singleProduct.category || ""

         );



         setStock(

            singleProduct.stock || ""

         );



         setDescription(

            singleProduct.description || ""

         );



         setHighlights(

            singleProduct.highlights?.length > 0

            ?

            singleProduct.highlights

            :

            [""]

         );



         setVariants(

            singleProduct.variants?.length > 0

            ?

            singleProduct.variants

            :

            [

               {

                  type:"",
                  value:"",
                  price:"",
                  stock:""

               }

            ]

         );

      }

   },[singleProduct]);



   /* =========================================
      HIGHLIGHTS
   ========================================= */

   const addHighlight = ()=>{

      setHighlights(

         [...highlights,""]

      );

   };



   const handleHighlightChange =

   (index,value)=>{

      const updated =

      [...highlights];



      updated[index] = value;



      setHighlights(updated);

   };



   /* =========================================
      VARIANTS
   ========================================= */

   const addVariant = ()=>{

      setVariants([

         ...variants,

         {

            type:"",
            value:"",
            price:"",
            stock:""

         }

      ]);

   };



   const removeVariant =

   (index)=>{

      const updated =

      variants.filter(

         (_,i)=>i !== index

      );



      setVariants(updated);

   };



   const handleVariantChange =

   (

      index,
      field,
      value

   )=>{

      const updated =

      [...variants];



      updated[index] = {

         ...updated[index],

         [field]:value

      };



      setVariants(updated);

   };



   /* =========================================
      REMOVE EXISTING IMAGE
   ========================================= */

   const removeExistingImage =

   (index)=>{

      const updatedImages =

      singleProduct.images.filter(

         (_,i)=>i !== index

      );



      dispatch({

         type:"products/setSingleProduct",

         payload:{

            ...singleProduct,

            images:updatedImages

         }

      });

   };



   /* =========================================
      IMAGE CHANGE
   ========================================= */

   const imageChangeHandler =

   (e)=>{

      setImages(

         Array.from(

            e.target.files

         )

      );

   };



   /* =========================================
      UPDATE PRODUCT
   ========================================= */

   const submitHandler =
   async(e)=>{

      e.preventDefault();



      try{

         const formData =
         new FormData();



         formData.append(

            "title",
            title

         );



         formData.append(

            "price",
            price

         );

         formData.append(
   "discount",
   discount
);



         formData.append(

            "category",
            category

         );



         formData.append(

            "stock",
            stock

         );



         formData.append(

            "description",
            description

         );



         /* HIGHLIGHTS */

         const filteredHighlights =

         highlights.filter(

            (item)=>

            item.trim() !== ""

         );



         formData.append(

            "highlights",

            JSON.stringify(

               filteredHighlights

            )

         );



         /* VARIANTS */

         const filteredVariants =

         variants.filter(

            (variant)=>

               variant.type ||

               variant.value ||

               variant.price ||

               variant.stock

         );



         formData.append(

            "variants",

            JSON.stringify(

               filteredVariants

            )

         );



         /* EXISTING IMAGES */

         formData.append(

            "existingImages",

            JSON.stringify(

               singleProduct.images

            )

         );



         /* NEW IMAGES */

         images.forEach((image)=>{

            formData.append(

               "images",
               image

            );

         });





         await api.put(

            `/products/${id}`,

            formData,

            {

               headers:{

                  Authorization:

                  `Bearer ${userInfo.token}`,

                  "Content-Type":

                  "multipart/form-data"

               }

            }

         );



         toast.success(

            "Product Updated"

         );



         navigate(

            "/admin/products"

         );

      }

      catch(error){

         toast.error(

            error.response?.data?.message ||

            "Update Failed"

         );

      }

   };



   return(

      <div className="container py-4">

         <div

            className="card border-0 shadow-sm p-4"

            style={{

               borderRadius:"20px"

            }}

         >

            <h2 className="fw-bold mb-4">

               Edit Product

            </h2>



            <form onSubmit={submitHandler}>

               {/* TITLE */}

               <div className="mb-3">

                  <label>

                     Product Title

                  </label>



                  <input

                     type="text"

                     className="form-control"

                     value={title}

                     onChange={(e)=>

                        setTitle(

                           e.target.value

                        )

                     }

                  />

               </div>



               {/* PRICE */}

               <div className="mb-3">

                  <label>

                     Price

                  </label>



                  <input

                     type="number"

                     className="form-control"

                     value={price}

                     onChange={(e)=>

                        setPrice(

                           e.target.value

                        )

                     }

                  />

               </div>

               {/* DISCOUNT */}

<div className="mb-3">

   <label>

      Discount %

   </label>

   <input

      type="number"

      className="form-control"

      value={discount}

      onChange={(e)=>

         setDiscount(
            e.target.value
         )

      }

   />

</div>



               {/* CATEGORY */}

               <div className="mb-3">

                  <label>

                     Category

                  </label>



                  <input

                     type="text"

                     className="form-control"

                     value={category}

                     onChange={(e)=>

                        setCategory(

                           e.target.value

                        )

                     }

                  />

               </div>



               {/* STOCK */}

               <div className="mb-3">

                  <label>

                     Stock

                  </label>



                  <input

                     type="number"

                     className="form-control"

                     value={stock}

                     onChange={(e)=>

                        setStock(

                           e.target.value

                        )

                     }

                  />

               </div>



               {/* DESCRIPTION */}

               <div className="mb-4">

                  <label>

                     Description

                  </label>



                  <textarea

                     rows="4"

                     className="form-control"

                     value={description}

                     onChange={(e)=>

                        setDescription(

                           e.target.value

                        )

                     }

                  />

               </div>



               {/* IMAGES */}

               <div className="mb-5">

                  <label className="fw-bold mb-3">

                     Product Images

                  </label>



                  <input

                     type="file"

                     multiple

                     className="form-control"

                     onChange={imageChangeHandler}

                  />



                  {/* EXISTING IMAGES */}

                  {

                  singleProduct?.images?.length > 0 && (

                     <div className="row mt-4">

                        {

                        singleProduct.images.map(

                           (image,index)=>(

                              <div

                                 className="col-md-2 mb-3"

                                 key={index}

                              >

                                 <div className="position-relative">

                                    <img

                                       src={image.url || image}

                                       alt="product"

                                       className="img-fluid rounded shadow-sm"

                                       style={{

                                          height:"120px",

                                          objectFit:"cover",

                                          width:"100%"

                                       }}

                                    />



                                    <button

                                       type="button"

                                       className="btn btn-danger btn-sm position-absolute top-0 end-0"

                                       onClick={()=>

                                          removeExistingImage(index)

                                       }

                                    >

                                       X

                                    </button>

                                 </div>

                              </div>

                           )

                        )

                        }

                     </div>

                  )

                  }



                  {/* NEW IMAGES */}

                  <div className="row mt-4">

                     {

                     images.length > 0 &&

                     Array.from(images).map(

                        (image,index)=>(

                           <div

                              className="col-md-2 mb-3"

                              key={index}

                           >

                              <img

                                 src={URL.createObjectURL(image)}

                                 alt="preview"

                                 className="img-fluid rounded shadow-sm"

                                 style={{

                                    height:"120px",

                                    objectFit:"cover",

                                    width:"100%"

                                 }}

                              />

                           </div>

                        )

                     )

                     }

                  </div>

               </div>



               {/* HIGHLIGHTS */}

               <div className="mb-5">

                  <div className="d-flex justify-content-between align-items-center mb-3">

                     <label className="fw-bold">

                        Highlights

                     </label>



                     <button

                        type="button"

                        className="btn btn-dark"

                        onClick={addHighlight}

                     >

                        Add Highlight

                     </button>

                  </div>



                  {

                  highlights.map(

                     (highlight,index)=>(

                        <input

                           key={index}

                           type="text"

                           placeholder="Highlight"

                           className="form-control mb-3"

                           value={highlight || ""}

                           onChange={(e)=>

                              handleHighlightChange(

                                 index,
                                 e.target.value

                              )

                           }

                        />

                     )

                  )

                  }

               </div>



               {/* VARIANTS */}

               <div className="mb-5">

                  <div className="d-flex justify-content-between align-items-center mb-3">

                     <label className="fw-bold fs-5">

                        Product Variants

                     </label>



                     <button

                        type="button"

                        className="btn btn-dark"

                        onClick={addVariant}

                     >

                        Add Variant

                     </button>

                  </div>



                  {

                  variants.map(

                     (variant,index)=>(

                        <div

                           key={index}

                           className="row mb-3 align-items-center"

                        >

                           {/* TYPE */}

                           <div className="col-md-3">

                              <select

                                 className="form-select"

                                 value={variant.type || ""}

                                 onChange={(e)=>

                                    handleVariantChange(

                                       index,

                                       "type",

                                       e.target.value

                                    )

                                 }

                              >

                                 <option value="">

                                    Select Type

                                 </option>



                                 <option value="Color">

                                    Color

                                 </option>



                                 <option value="Size">

                                    Size

                                 </option>



                                 <option value="RAM">

                                    RAM

                                 </option>



                                 <option value="Storage">

                                    Storage

                                 </option>

                              </select>

                           </div>



                           {/* VALUE */}

                           <div className="col-md-3">

                              <input

                                 type="text"

                                 placeholder="Variant Value"

                                 className="form-control"

                                 value={variant.value || ""}

                                 onChange={(e)=>

                                    handleVariantChange(

                                       index,

                                       "value",

                                       e.target.value

                                    )

                                 }

                              />

                           </div>



                           {/* PRICE */}

                           <div className="col-md-2">

                              <input

                                 type="number"

                                 placeholder="Price"

                                 className="form-control"

                                 value={variant.price || ""}

                                 onChange={(e)=>

                                    handleVariantChange(

                                       index,

                                       "price",

                                       e.target.value

                                    )

                                 }

                              />

                           </div>



                           {/* STOCK */}

                           <div className="col-md-2">

                              <input

                                 type="number"

                                 placeholder="Stock"

                                 className="form-control"

                                 value={variant.stock || ""}

                                 onChange={(e)=>

                                    handleVariantChange(

                                       index,

                                       "stock",

                                       e.target.value

                                    )

                                 }

                              />

                           </div>



                           {/* REMOVE */}

                           <div className="col-md-2">

                              <button

                                 type="button"

                                 className="btn btn-danger w-100"

                                 onClick={()=>

                                    removeVariant(index)

                                 }

                              >

                                 Remove

                              </button>

                           </div>

                        </div>

                     )

                  )

                  }

               </div>



               {/* BUTTON */}

               <button

                  className="btn btn-dark px-5 py-3"

                  style={{

                     borderRadius:"12px"

                  }}

               >

                  Update Product

               </button>

            </form>

         </div>

      </div>

   );

};



export default EditProduct;