import Stripe from "stripe";

import Cart from "../models/CartModel.js";

import Order from "../models/OrderModel.js";

import { User }from "../models/UserModel.js";

import { sendMail }from "../utils/sendMail.js";





// MAKE PAYMENT

export const makePayment = async(req,res)=>{

   try{



      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

      const cartItems =await Cart.find({user:req.user._id}).populate("product");

      if(cartItems.length === 0){

         return res.status(400).json({

            message:"Cart Empty"

         });

      }

      const totalAmount =Number(req.body.totalAmount);

      if(!totalAmount){

         return res.status(400).json({

            message:"Invalid Amount"

         });

      }

      const line_items = [

         {

            price_data:{

               currency:"inr",

               product_data:{

                  name:"Order Payment"

               },

               unit_amount:totalAmount * 100

            },

            quantity:1

         }

      ];

      for(const item of cartItems){

   if(item.product.stock <item.quantity){

      return res.status(400).json({

         message:

         `${item.product.title} Out Of Stock`

      });

   }

}

      const session =await stripe.checkout.sessions.create({

         payment_method_types:[
            "card"
         ],

         line_items,

         mode:"payment",

         success_url:
         "http://localhost:5173/payment-success",

         cancel_url:
         "http://localhost:5173/cancel"

      });

      res.status(200).json({

         id:session.id,

         url:session.url

      });

   }catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};











// PAYMENT SUCCESS

export const paymentSuccess = async(req,res)=>{

   try{

      /* GET USER CART ITEMS */
     

      const cartItems =await Cart.find({user:req.user._id}).populate("product");



      /* CHECK EMPTY CART */

      if(cartItems.length === 0){

         return res.status(400).json({

            message:"Cart Empty"

         });

      }



      /* PRODUCTS ARRAY */

   const products =cartItems.map((item)=>{

   const storagePrice =item.variants?.find(v => v.type === "Storage")?.price ||item.product.price ||0;

   const colorPrice =item.variants?.find(v => v.type === "Color")?.price ||0;

   const finalVariantPrice =Number(storagePrice) +Number(colorPrice);

   return {

      product:item.product._id,

      quantity:item.quantity,

      variants:item.variants || [],

      totalPrice:

      finalVariantPrice *

      item.quantity

   };

});

      /* STOCK REDUCTION */

      for(const item of cartItems){

         /* CHECK PRODUCT STOCK */

         if(item.product.stock <item.quantity){

            return res.status(400).json({

               message:
               `${item.product.title}
               Out Of Stock`

            });

         }



         /* REDUCE MAIN STOCK */

         item.product.stock -=item.quantity;



         /* VARIANT STOCK */

       

for(const orderedVariant of item.variants || []){

   const productVariant =item.product.variants.find(

   (variant)=>

      variant.type ===orderedVariant.type &&variant.value ===orderedVariant.value

);



   if(productVariant){

      productVariant.stock -=item.quantity;

   }

}



/* SAVE PRODUCT */
await item.product.save();
}


      /* TOTAL PRICE */

      const totalPrice =Number(req.body.totalAmount);

if(!totalPrice){

   return res.status(400).json({

      message:
      "Invalid Total Amount"

   });

}



      /* GET USER */

      const user =await User.findById(req.user._id);



      /* CREATE ORDER */
const order =await Order.create({

user:req.user._id,

products,

shippingAddress:
user.address,

originalPrice:
req.body.originalPrice ||
totalPrice,

couponCode:
req.body.couponCode ||
"",

discount:
req.body.discount ||
0,

discountAmount:
req.body.discountAmount ||
0,

totalPrice,

paymentStatus:"Paid",

orderStatus:"Processing"

});

/* EMAIL TEMPLATE */

const htmlMessage = `

<div style="font-family:Arial,sans-serif;background:#f8fafc;padding:30px">

   <div style="max-width:700px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);">


  <div style="background:#111827;padding:25px;text-align:center;">

     <h1 style="color:#ffffff;margin:0;">
        CHANDU STORE
     </h1>

     <p style="color:#d1d5db;margin-top:10px;">
        Premium Ecommerce Shopping Platform
     </p>

  </div>

  <div style="padding:30px;">

     <h2 style="color:#111827;">
        🎉 Order Confirmed
     </h2>

     <p>
        Hi <b>${user.name}</b>,
     </p>

     <p>
        Thank you for shopping with us.
        Your order has been placed successfully.
     </p>

     <div style="background:#f3f4f6;padding:20px;border-radius:10px;">

        <p>
           <b>Order ID:</b>
           ${order._id}
        </p>

        <p>
           <b>Total Amount:</b>
           ₹${totalPrice}
        </p>

        <p>
           <b>Payment Status:</b>
           Paid
        </p>

        <p>
           <b>Order Status:</b>
           Processing
        </p>

     </div>

     <div style="margin-top:20px;">

        <p>
           <b>Shipping Address</b>
        </p>

        <p>
           ${user.address?.fullName || ""}
        </p>

        <p>
           ${user.address?.phone || ""}
        </p>

        <p>
           ${user.address?.houseNo || ""},
           ${user.address?.area || ""}
        </p>

        <p>
           ${user.address?.city || ""},
           ${user.address?.state || ""}
        </p>

     </div>

  </div>

  <div style="background:#f9fafb;padding:20px;text-align:center;color:#6b7280;">

     © 2026 CHANDU STORE

  </div>


   </div>

</div>

`;

/* SEND EMAIL */

await sendMail(

user.email,

"🎉 Order Confirmation - CHANDU STORE",

htmlMessage

);

/* CLEAR CART */

await Cart.deleteMany({

user:req.user._id

});

res.status(201).json({

message:"Payment Successful",

order

});


   }catch(error){

      console.log(error);



      res.status(500).json({

         message:error.message

      });

   }

};