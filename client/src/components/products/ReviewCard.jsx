import { FaStar } from "react-icons/fa";

const ReviewCard = ({

   review

}) => {

   return (

      <div
         className="card border-0 p-4 mb-4"
         style={{
            borderRadius: "20px",
            background: "#fff",
            boxShadow:
            "0 10px 30px rgba(0,0,0,0.06)"
         }}
      >

         <div>

            <h5 className="fw-bold">

               {review.name}

            </h5>

            <div className="d-flex gap-1">

               {[...Array(review.rating)]
               .map((_, i) => (

                  <FaStar
                     key={i}
                     color="#f59e0b"
                  />

               ))}

            </div>

         </div>

         <p className="text-muted mt-3 mb-0">

            {review.comment}

         </p>

         <small className="text-secondary">

            {review.createdAt
               ? new Date(
                    review.createdAt
                 ).toLocaleDateString()
               : ""}
         </small>

      </div>

   );

};

export default ReviewCard;