import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Order from "../models/OrderModel.js";
import Cart from "../models/CartModel.js";
import { User } from "../models/UserModel.js";


/* =========================================
   CREATE ORDER
========================================= */

export const createOrder = async (req, res) => {

   try {

      const cartItems = await Cart.find({ user: req.user._id }).populate("product");



      if (cartItems.length === 0) {

         return res.status(400).json({

            message: "Cart Empty"

         });

      }



      const products = cartItems.map((item) => ({

         product: item.product._id,

         quantity: item.quantity,

         totalPrice: item.product.price * item.quantity

      }));



      const totalPrice = cartItems.reduce((total, item) => {

         return total + (item.product.price * item.quantity);
      }, 0);



      const user = await User.findById(req.user._id);



      const order = await Order.create({

         user: req.user._id,

         products,

         shippingAddress:

            user.address,

         totalPrice,

         orderStatus: "Processing"

      });



      await Cart.deleteMany({ user: req.user._id });



      res.status(201).json(order);

   } catch (error) {

      res.status(500).json({

         message: error.message

      });

   }

};





/* =========================================
   GET USER ORDERS
========================================= */

export const getUserOrders = async (req, res) => {

   try {

      const orders = await Order.find({ user: req.user._id }).populate("products.product");



      res.status(200).json(orders);

   } catch (error) {

      res.status(500).json({

         message: error.message

      });

   }

};





/* =========================================
   GET ALL ORDERS
========================================= */

export const getAllOrders = async (req, res) => {

   try {

      const orders = await Order.find().populate("user", "name email").populate("products.product");



      res.status(200).json(orders);

   }

   catch (error) {

      res.status(500).json({

         message: error.message

      });

   }

};





/* =========================================
   UPDATE ORDER STATUS
========================================= */

export const updateOrderStatus = async (req, res) => {

   try {

      const order = await Order.findById(req.params.id);



      if (!order) {

         return res.status(404).json({

            message:

               "Order Not Found"

         });

      }



      /* UPDATE STATUS */

      order.orderStatus = req.body.orderStatus;
      await order.save();



      /* POPULATE USER + PRODUCTS */

      const updatedOrder = await Order.findById(order._id).populate("user", "name email").populate("products.product");



      res.status(200).json({
         message: "Order Status Updated",

         order: updatedOrder

      });

   } catch (error) {

      res.status(500).json({

         message: error.message

      });

   }

};




/* =========================================
   DOWNLOAD INVOICE
========================================= */

export const downloadInvoice = async (req, res) => {

   try {

      /* =========================================
         GET ORDER
      ========================================= */

      const order = await Order.findById(req.params.id).populate("products.product");



      if (!order) {

         return res.status(404).json({

            message: "Order Not Found"

         });

      }



      /* =========================================
         PDF
      ========================================= */

      const doc = new PDFDocument({ margin: 40 });



      /* =========================================
         HEADERS
      ========================================= */

      res.setHeader("Content-Type", "application/pdf");

      res.setHeader("Content-Disposition", `inline; filename=invoice-${order._id}.pdf`);
      doc.pipe(res);



      /* =========================================
         PATHS
      ========================================= */

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const logoPath = path.join(__dirname, "../assets/logo.png");



      /* =========================================
         HEADER BG
      ========================================= */

      doc.rect(0, 0, 700, 130).fill("#0f172a");



      /* =========================================
         SAFE LOGO
      ========================================= */

      try {

         if (fs.existsSync(logoPath)) {

            doc.image(logoPath, 40, 30, { width: 65 });

         }

      }

      catch (error) {

         console.log("Logo Error:", error.message);

      }



      /* =========================================
         WEBSITE NAME
      ========================================= */

      doc.fillColor("#ffffff").fontSize(30).font("Helvetica-Bold").text("CHANDU STORE", 120, 40);

      doc.fontSize(12).fillColor("#cbd5e1").font("Helvetica").text("Premium Ecommerce Shopping Platform", 122, 78);



      /* =========================================
         INVOICE TITLE
      ========================================= */

      doc.fontSize(24).fillColor("#ffffff").font("Helvetica-Bold").text("INVOICE", 430, 45);



      doc.fontSize(11).fillColor("#e2e8f0").font("Helvetica").text(`Date: ${new Date().toLocaleDateString()}`, 430, 80);



      /* =========================================
         INFO BOX
      ========================================= */

      doc.roundedRect(40, 150, 520, 180, 10).fillAndStroke("#f8fafc", "#e2e8f0");



      /* =========================================
         CUSTOMER TITLE
      ========================================= */

      doc.fillColor("#0f172a").fontSize(16).font("Helvetica-Bold").text("Customer Details", 60, 170);



      /* =========================================
         CUSTOMER DETAILS
      ========================================= */

      const customerLines = [

         order.shippingAddress?.fullName || "",

         order.shippingAddress?.phone || "",

         `${order.shippingAddress?.houseNo || ""}, ${order.shippingAddress?.area || ""}`,

         `${order.shippingAddress?.city || ""}, ${order.shippingAddress?.state || ""}`,

         `${order.shippingAddress?.country || ""} - ${order.shippingAddress?.pincode || ""}`

      ];



      let customerY = 205;



      customerLines.forEach((line) => {

         doc.fontSize(11).fillColor("#475569").font("Helvetica").text(line, 60, customerY, { width: 220, ellipsis: true });



         customerY += 22;

      });



      /* =========================================
         ORDER TITLE
      ========================================= */

      doc.fillColor("#0f172a").fontSize(16).font("Helvetica-Bold").text("Order Details", 340, 170);



      /* =========================================
         ORDER DETAILS
      ========================================= */

      const orderLines = [

         "Order ID:",

         `${order._id}`,

         `Status: ${order.orderStatus}`,

         "Payment: Paid"

      ];



      let orderY = 205;



      orderLines.forEach((line) => {

         doc.fontSize(11).fillColor("#475569").font("Helvetica").text(line,340,orderY,{width: 180,ellipsis: true});



         orderY += 22;

      });



      /* =========================================
         DYNAMIC TABLE POSITION
      ========================================= */

      const tableTop =Math.max(customerY,orderY) + 40;



      /* =========================================
         TABLE HEADER
      ========================================= */

      doc.roundedRect(40,tableTop,520,32,5).fill("#0f172a");



      doc.fillColor("#ffffff").fontSize(12).font("Helvetica-Bold").text("Product",60,tableTop + 10).text("Qty",300,tableTop + 10)



         .text(

            "Price",

            380,

            tableTop + 10

         )



         .text(

            "Total",

            470,

            tableTop + 10

         );



      /* =========================================
   PRODUCTS
========================================= */

      let y = tableTop + 50;

      const totalOriginalPrice =order.products.reduce((total, item) => {

               return total +(item.product.price *item.quantity);},0);

      const discountRatio =order.totalPrice /totalOriginalPrice;

      order.products.forEach((item, index) => {

         if (index % 2 === 0) {

            doc.roundedRect(40,y - 8,520,30,5).fill("#f8fafc");

         }

         const discountedPrice =Math.round(item.product.price *discountRatio);

         const discountedTotal =discountedPrice *item.quantity;

         doc.fillColor("#334155").fontSize(11).font("Helvetica").text(item.product?.title || "",60,y,{width: 200}).text(item.quantity.toString(),305,y)

            .text(`Rs. ${discountedPrice}`,375,y)

            .text(`Rs. ${discountedTotal}`,465,y);

         y += 40;

      });


      /* =========================================
         COUPON DETAILS
      ========================================= */

      if (order.discount > 0) {

         doc.roundedRect(40,y + 20,250,110,8).fillAndStroke("#f8fafc","#e2e8f0");

         doc.fillColor("#0f172a").fontSize(14).font("Helvetica-Bold").text("Coupon Details",55,y + 35);

         doc.fillColor("#475569").fontSize(11).font("Helvetica").text(`Original Price : Rs. ${order.originalPrice}`,55,y + 60);

         doc.text(`Coupon Code : ${order.couponCode}`,55,y + 80);

         doc.text(`Discount : ${order.discount}%`,55,y + 100);

         doc.text(`Saved : Rs. ${order.discountAmount}`,55,y + 120);

         y += 130;
      }

      /* =========================================
         TOTAL BOX
      ========================================= */

      doc.roundedRect(330,y + 20,230,60,10).fill("#0f172a");
      doc.fillColor("#ffffff").fontSize(18).font("Helvetica-Bold").text("Grand Total",350,y + 38);
      doc.text(`Rs. ${order.totalPrice}`,470,y + 38);



      /* =========================================
         FOOTER
      ========================================= */

      y += 120;



      doc.fontSize(16).fillColor("#16a34a").font("Helvetica-Bold").text("Thank You For Shopping With Us!",140,y);
      doc.fontSize(10).fillColor("#64748b").font("Helvetica").text("CHANDU STORE © 2026",230,y + 30);



      /* =========================================
         END PDF
      ========================================= */

      doc.end();

   }catch (error) {

      console.log(error);



      if (!res.headersSent) {

         return res.status(500).json({

            message: error.message

         });

      }

   }

};