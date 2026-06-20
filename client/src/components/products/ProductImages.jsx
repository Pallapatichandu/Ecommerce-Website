import { useState } from "react";

const ProductImages = ({ images = [] }) => {

   const [selectedImage,setSelectedImage] =
   useState(

      images?.[0] ||

      "https://dummyimage.com/600x600/cccccc/000000"

   );

   return(

      <div>

         {/* MAIN IMAGE */}

         <div
            className="border rounded overflow-hidden mb-3"
            style={{
               height:"500px"
            }}
         >

            <img

               src={selectedImage}

               alt="Product"

               className="img-fluid w-100 h-100"

               style={{
                  objectFit:"cover"
               }}

            />

         </div>

         {/* THUMBNAILS */}

         <div
            className="d-flex flex-wrap gap-3"
         >

            {images?.map(

               (image,index)=>(

                  <img

                     key={index}

                     src={image}

                     alt={`Product ${index}`}

                     onClick={()=>{

                        setSelectedImage(
                           image
                        );

                     }}

                     style={{

                        width:"90px",

                        height:"90px",

                        objectFit:"cover",

                        border:

                        selectedImage === image

                        ?

                        "3px solid #198754"

                        :

                        "1px solid #ddd",

                        borderRadius:"10px",

                        cursor:"pointer"

                     }}

                  />

               )

            )}

         </div>

      </div>

   );

};

export default ProductImages;