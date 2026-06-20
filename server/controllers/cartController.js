import Cart from "../models/CartModel.js";
/* ADD TO CART */

export const addToCart = async (req,res) => {
  try {
     const { productId, quantity, variants } = req.body;

     /* CHECK EXISTING */

      const existingItem = await Cart.findOne({ user: req.user._id, product: productId });
      /* IF EXISTS → REMOVE */

      if (existingItem) {

         await Cart.findByIdAndDelete(existingItem._id);
         return res.status(200).json({ message: "Removed From Cart" });

      }


      /* CREATE */

      const cartItem =await Cart.create({

            user: req.user._id,

            product: productId,

            quantity: quantity || 1,

            variants: variants || []

         });



      /* POPULATE */

      const populatedCart =await Cart.findById( cartItem._id).populate("product");
      res.status(201).json(populatedCart);

   }catch (error) {

      console.log(error);

      res.status(500).json({

         message: error.message

      });

   }

};

/* GET USER CART */

export const getCartItems =
   async (req, res) => {

      try {

         const cartItems =await Cart.find({user: req.user._id}).populate("product");
        res.status(200).json(cartItems);

      }

      catch (error) {

         res.status(500).json({

            message: error.message

         });

      }

   };

/* INCREASE QUANTITY */

export const increaseQuantity =async (req,res) => {

      try {

         const cartItem =
            await Cart.findById(

               req.params.id

            ).populate("product");



         if (!cartItem) {

            return res.status(404).json({

               message:

                  "Cart Item Not Found"

            });

         }



         cartItem.quantity += 1;



         await cartItem.save();



         const updatedItem =await Cart.findById(cartItem._id).populate("product");
         res.status(200).json(updatedItem);

      }catch (error) {

         res.status(500).json({

            message: error.message

         });

      }

   };

/* DECREASE QUANTITY */

export const decreaseQuantity =async (req,res) => {

      try {

         const cartItem =await Cart.findById(req.params.id).populate("product");
         if (!cartItem) {

            return res.status(404).json({

               message:

                  "Cart Item Not Found"

            });

         }



         if (cartItem.quantity > 1) {

            cartItem.quantity -= 1;



            await cartItem.save();

         }



         const updatedItem =await Cart.findById(cartItem._id).populate("product");

         res.status(200).json(updatedItem);

      }catch (error) {

         res.status(500).json({

            message: error.message

         });

      }

   };

/* REMOVE CART ITEM */

export const removeCartItem =async (req,res) => {

      try {

         await Cart.findByIdAndDelete(req.params.id);

         res.status(200).json({message: "Cart Item Removed"});

      }catch (error) {

         res.status(500).json({

            message: error.message

         });

      }

   };