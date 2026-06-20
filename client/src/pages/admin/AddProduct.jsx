import {
   useState
} from "react";

import {
   useDispatch,
   useSelector
} from "react-redux";

import {
   useNavigate
} from "react-router-dom";

import toast
   from "react-hot-toast";

import {
   createProduct
} from "../../redux/slices/adminSlice";

const AddProduct = () => {

   const dispatch =
      useDispatch();

   const navigate =
      useNavigate();

   const { userInfo } =
      useSelector(

         (state) => state.auth

      );

   const [

      productData,

      setProductData

   ] = useState({

      title: "",

      description: "",

      price: "",
      discount: "",

      category: "",

      stock: "",

      images: [],

      highlights: [""],

      variants: [

         {

            type: "",
            value: "",
            price: "",
            stock: ""

         }

      ]

   });

   /* =========================================
      HANDLE INPUT
   ========================================= */

   const handleChange = (e) => {

      setProductData({

         ...productData,

         [e.target.name]:

            e.target.value

      });

   };

   /* =========================================
      HIGHLIGHTS
   ========================================= */

   const handleHighlightChange = (

      index,
      value

   ) => {

      const updatedHighlights =

         [...productData.highlights];

      updatedHighlights[index] =
         value;

      setProductData({

         ...productData,

         highlights:
            updatedHighlights

      });

   };

   const addHighlightField = () => {

      setProductData({

         ...productData,

         highlights: [

            ...productData.highlights,

            ""

         ]

      });

   };

   /* =========================================
      VARIANTS
   ========================================= */

   const handleVariantChange = (

      index,
      field,
      value

   ) => {

      const updatedVariants =

         [...productData.variants];

      updatedVariants[index] = {

         ...updatedVariants[index],

         [field]: value

      };

      setProductData({

         ...productData,

         variants: updatedVariants

      });

   };

   const addVariantField = () => {

      setProductData({

         ...productData,

         variants: [

            ...productData.variants,

            {

               type: "",
               value: "",
               price: "",
               stock: ""

            }

         ]

      });

   };

   const removeVariant =

      (index) => {

         const updatedVariants =

            productData.variants.filter(

               (_, i) => i !== index

            );

         setProductData({

            ...productData,

            variants: updatedVariants

         });

      };

   /* =========================================
      IMAGE UPLOAD
   ========================================= */

   const handleImageUpload = (e) => {

      setProductData({

         ...productData,

         images: [

            ...e.target.files

         ]

      });

   };

   /* =========================================
      SUBMIT
   ========================================= */

   const submitHandler =
      async (e) => {

         e.preventDefault();

         try {

            const formData =
               new FormData();

            /* TEXT DATA */

            formData.append(

               "title",

               productData.title

            );

            formData.append(

               "description",

               productData.description

            );

            formData.append(

               "price",

               productData.price

            );

            formData.append(
               "discount",
               productData.discount
            );

            formData.append(

               "category",

               productData.category

            );

            formData.append(

               "stock",

               productData.stock

            );

            /* HIGHLIGHTS */

            const filteredHighlights =

               productData.highlights.filter(

                  (item) =>

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

               productData.variants.filter(

                  (variant) =>

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

            /* IMAGES */

            productData.images.forEach(

               (image) => {

                  formData.append(

                     "images",

                     image

                  );

               }

            );

            /* CREATE PRODUCT */

            await dispatch(

               createProduct({

                  formData,

                  token: userInfo.token

               })

            ).unwrap();

            toast.success(

               "Product Added Successfully"

            );

            navigate(

               "/admin/products"

            );

         }

         catch (error) {

            console.log(error);

            toast.error(

               error ||

               "Failed To Add Product"

            );

         }

      };

   return (

      <div className="container-fluid py-4">

         <div className="mb-4">

            <h2 className="fw-bold">

               Add Product

            </h2>

         </div>

         <div

            className="card border-0 shadow-sm p-4"

            style={{

               borderRadius: "20px"

            }}

         >

            <form onSubmit={submitHandler}>

               <div className="row">

                  {/* TITLE */}

                  <div className="col-md-6 mb-4">

                     <label className="form-label">

                        Product Title

                     </label>

                     <input

                        type="text"

                        name="title"

                        value={productData.title}

                        onChange={handleChange}

                        className="form-control"

                        required

                     />

                  </div>

                  {/* PRICE */}

                  <div className="col-md-6 mb-4">

                     <label className="form-label">

                        Price

                     </label>

                     <input

                        type="number"

                        name="price"

                        value={productData.price}

                        onChange={handleChange}

                        className="form-control"

                        required

                     />

                  </div>

                  {/* DISCOUNT */}

                  <div className="col-md-6 mb-4">

                     <label className="form-label">

                        Discount %

                     </label>

                     <input

                        type="number"

                        name="discount"

                        value={productData.discount}

                        onChange={handleChange}

                        className="form-control"

                        placeholder="Enter Discount %"

                     />

                  </div>

                  {/* CATEGORY */}

                  <div className="col-md-6 mb-4">

                     <label className="form-label">

                        Category

                     </label>

                     <input

                        type="text"

                        name="category"

                        value={productData.category}

                        onChange={handleChange}

                        className="form-control"

                        required

                     />

                  </div>

                  {/* STOCK */}

                  <div className="col-md-6 mb-4">

                     <label className="form-label">

                        Stock

                     </label>

                     <input

                        type="number"

                        name="stock"

                        value={productData.stock}

                        onChange={handleChange}

                        className="form-control"

                        required

                     />

                  </div>

                  {/* DESCRIPTION */}

                  <div className="col-12 mb-4">

                     <label className="form-label">

                        Description

                     </label>

                     <textarea

                        rows="4"

                        name="description"

                        value={productData.description}

                        onChange={handleChange}

                        className="form-control"

                        required

                     />

                  </div>

               </div>

               {/* IMAGE UPLOAD */}

               <div className="mb-5">

                  <h5 className="fw-bold mb-3">

                     Product Images

                  </h5>

                  <input

                     type="file"

                     multiple

                     className="form-control"

                     onChange={handleImageUpload}

                     required

                  />

                  {/* IMAGE PREVIEW */}

                  <div className="row mt-4">

                     {

                        productData.images.length > 0 &&

                        Array.from(

                           productData.images

                        ).map(

                           (image, index) => (

                              <div

                                 className="col-md-2 mb-3"

                                 key={index}

                              >

                                 <img

                                    src={URL.createObjectURL(image)}

                                    alt="preview"

                                    className="img-fluid rounded shadow-sm"

                                    style={{

                                       height: "120px",

                                       objectFit: "cover",

                                       width: "100%"

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

                     <h5 className="fw-bold">

                        Highlights

                     </h5>

                     <button

                        type="button"

                        onClick={addHighlightField}

                        className="btn btn-dark"

                     >

                        Add Highlight

                     </button>

                  </div>

                  {

                     productData.highlights.map(

                        (highlight, index) => (

                           <input

                              key={index}

                              type="text"

                              value={highlight || ""}

                              onChange={(e) =>

                                 handleHighlightChange(

                                    index,

                                    e.target.value

                                 )

                              }

                              className="form-control mb-3"

                              placeholder="Highlight"

                           />

                        )

                     )

                  }

               </div>

               {/* VARIANTS */}

               <div className="mb-5">

                  <div className="d-flex justify-content-between align-items-center mb-3">

                     <h5 className="fw-bold">

                        Product Variants

                     </h5>

                     <button

                        type="button"

                        onClick={addVariantField}

                        className="btn btn-dark"

                     >

                        Add Variant

                     </button>

                  </div>

                  {

                     productData.variants.map(

                        (variant, index) => (

                           <div

                              key={index}

                              className="row mb-3 align-items-center"

                           >

                              {/* TYPE */}

                              <div className="col-md-3">

                                 <select

                                    value={variant.type || ""}

                                    onChange={(e) =>

                                       handleVariantChange(

                                          index,

                                          "type",

                                          e.target.value

                                       )

                                    }

                                    className="form-select"

                                 >

                                    <option value="">

                                       Select Type

                                    </option>

                                    <option value="Color">Color</option>
                                    <option value="Size">Size</option>
                                    <option value="RAM">RAM</option>
                                    <option value="Storage">Storage</option>

                                    <option value="Engine">Engine</option>
                                    <option value="Fuel">Fuel</option>
                                    <option value="Model">Model</option>
                                    <option value="ABS">ABS</option>
                                    <option value="Variant">Variant</option>

                                 </select>

                              </div>

                              {/* VALUE */}

                              <div className="col-md-3">

                                 <input

                                    type="text"

                                    placeholder="Variant Value"

                                    value={variant.value || ""}

                                    onChange={(e) =>

                                       handleVariantChange(

                                          index,

                                          "value",

                                          e.target.value

                                       )

                                    }

                                    className="form-control"

                                 />

                              </div>

                              {/* PRICE */}

                              <div className="col-md-2">

                                 <input

                                    type="number"

                                    placeholder="Price"

                                    value={variant.price || ""}

                                    onChange={(e) =>

                                       handleVariantChange(

                                          index,

                                          "price",

                                          e.target.value

                                       )

                                    }

                                    className="form-control"

                                 />

                              </div>

                              {/* STOCK */}

                              <div className="col-md-2">

                                 <input

                                    type="number"

                                    placeholder="Stock"

                                    value={variant.stock || ""}

                                    onChange={(e) =>

                                       handleVariantChange(

                                          index,

                                          "stock",

                                          e.target.value

                                       )

                                    }

                                    className="form-control"

                                 />

                              </div>

                              {/* REMOVE */}

                              <div className="col-md-2">

                                 <button

                                    type="button"

                                    className="btn btn-danger w-100"

                                    onClick={() =>

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

               {/* SUBMIT */}

               <button

                  type="submit"

                  className="btn btn-primary px-5 py-3"

                  style={{

                     borderRadius: "12px"

                  }}

               >

                  Add Product

               </button>

            </form>

         </div>

      </div>

   );

};

export default AddProduct;