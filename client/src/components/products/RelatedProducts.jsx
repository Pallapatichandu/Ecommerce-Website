import ProductCard from "./ProductCard";

const RelatedProducts = ({

   products = []

}) => {

   return (

      <div className="mt-5">

         <div className="mb-4">

            <h2 className="fw-bold">

               You May Also Like

            </h2>

            <p className="text-muted">

               Similar products recommended for you

            </p>

         </div>

         <div className="row">

            {

            products.length > 0

            ?

            products.map(

               (product)=>(

                  <ProductCard

                     key={product._id}

                     product={product}

                  />

               )

            )

            :

            (

               <div className="col-12">

                  <div className="alert alert-info">

                     No Related Products Found

                  </div>

               </div>

            )

            }

         </div>

      </div>

   );

};

export default RelatedProducts;