const DashboardCard = ({

   title,
   value,
   color

})=>{

   return(

      <div

         className="card border-0 shadow-sm p-4"

         style={{

            borderRadius:"20px"

         }}

      >

         <h6

            style={{

               color:"#6c757d"

            }}

         >

            {title}

         </h6>



         <h2

            className="fw-bold mt-2"

            style={{

               color

            }}

         >

            {value}

         </h2>

      </div>

   );

};



export default DashboardCard;