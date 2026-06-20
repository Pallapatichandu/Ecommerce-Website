import React from "react";

import {
   Route,
   Routes
} from "react-router-dom";

/* =========================================
   PUBLIC PAGES
========================================= */

import Home from "../pages/user/Home";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import ForgotPassword from "../pages/user/ForgotPassword";
import ResetPassword from "../pages/user/ResetPassword";
import ProductDetails from "../pages/user/ProductDetails";
import PaymentSuccess from "../pages/user/PaymentSuccess";

/* =========================================
   USER PAGES
========================================= */

import Cart from "../pages/user/Cart";
import Wishlist from "../pages/user/Wishlist";
import Checkout from "../pages/user/Checkout";
import Orders from "../pages/user/Orders";
import Payment from "../pages/user/Payment";

/* =========================================
   ADMIN PAGES
========================================= */

import AdminDashboard from "../pages/admin/AdminDashboard";
import AddProduct from "../pages/admin/AddProduct";
import AdminProducts from "../pages/admin/AdminProducts";
import EditProduct from "../pages/admin/EditProduct";
import AdminOrders from "../pages/admin/AdminOrders";
import SalesReport from "../pages/admin/SalesReport";
import Coupons from "../pages/admin/Coupons";
import AdminUsers from "../pages/admin/AdminUsers";

/* =========================================
   ROUTES
========================================= */

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

/* =========================================
   LAYOUTS
========================================= */

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

const AppRoutes = () => {

   return (

      <Routes>

         {/* ======================================
             PUBLIC + USER LAYOUT ROUTES
         ====================================== */}

         <Route element={<MainLayout />}>

            <Route
               path="/"
               element={<Home />}
            />

            <Route
               path="/login"
               element={<Login />}
            />

            <Route
               path="/register"
               element={<Register />}
            />

            <Route
               path="/forgot-password"
               element={<ForgotPassword />}
            />

            <Route
               path="/reset-password/:token"
               element={<ResetPassword />}
            />

            <Route
               path="/product/:id"
               element={<ProductDetails />}
            />

         </Route>

         {/* ======================================
             PAYMENT SUCCESS
         ====================================== */}

         <Route
            path="/payment-success"
            element={<PaymentSuccess />}
         />

         {/* ======================================
             PAYMENT CANCEL
         ====================================== */}

         <Route
            path="/cancel"
            element={
               <div className="container py-5 text-center">

                  <h1 className="text-danger fw-bold">
                     Payment Cancelled
                  </h1>

                  <p className="mt-3">
                     Your payment was cancelled.
                  </p>

               </div>
            }
         />

         {/* ======================================
             USER PROTECTED ROUTES
         ====================================== */}

         <Route element={<ProtectedRoute />}>

            <Route element={<MainLayout />}>

               <Route
                  path="/cart"
                  element={<Cart />}
               />

               <Route
                  path="/wishlist"
                  element={<Wishlist />}
               />

               <Route
                  path="/checkout"
                  element={<Checkout />}
               />

               <Route
                  path="/orders"
                  element={<Orders />}
               />

               <Route
                  path="/payment"
                  element={<Payment />}
               />

            </Route>

         </Route>

         {/* ======================================
             ADMIN ROUTES
         ====================================== */}

         <Route element={<AdminRoute />}>

            <Route element={<AdminLayout />}>

               <Route
                  path="/admin"
                  element={<AdminDashboard />}
               />

               <Route
                  path="/admin/add-product"
                  element={<AddProduct />}
               />

               <Route
                  path="/admin/products"
                  element={<AdminProducts />}
               />

               <Route
                  path="/admin/product/:id/edit"
                  element={<EditProduct />}
               />

               <Route
                  path="/admin/orders"
                  element={<AdminOrders />}
               />

               <Route
                  path="/admin/sales-report"
                  element={<SalesReport />}
               />

               <Route
                  path="/admin/users"
                  element={<AdminUsers />}
               />

               <Route
                  path="/admin/coupons"
                  element={<Coupons />}
               />

            </Route>

         </Route>

      </Routes>

   );

};

export default AppRoutes;