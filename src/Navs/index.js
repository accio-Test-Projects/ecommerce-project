import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import LandingPage from "../components/LandingPage";
import Dashboard from "../components/Admin/Dashboard";
import LandingPageCMS from "../components/Admin/LandingPageCMS";
import OrderCMS from "../components/Admin/OrderCMS";
import ProductCMS from "../components/Admin/ProductCMS";
import AdminAuth from "../components/Authentication/AdminAuth";
import CustomerAuth from "../components/Authentication/CustomerAuth";

import Cart from "../components/Customer/Cart";
import Checkout from "../components/Customer/Checkout";
import OrderSucess from "../components/Customer/OrderSucess";
import UserProfile from "../components/Customer/UserProfile";

import PDP from "../components/Customer/PDP";
import PSP from "../components/Customer/PSP";
import AdminHoc from "../HOC/AdminHoc";

// import Career from "../components/Career"; //example page
const ProtectedRoute = () => {
  if (true) {
    // TODO: check if user is logged in as admin
    return <Outlet />;
  } else {
    return <Navigate to="/admin/auth" />;
  }
};
const ProtectedUserRoute = () => {
  if (true) {
    // TODO: check if user is logged in as customer
    return <Outlet />;
  } else {
    return <Navigate to="/auth" />;
  }
};

function Navs() {
  return (
    <Router>
      <Routes>
        <Route element={<LandingPage />} path="/" />
        <Route element={<AdminAuth />} path="/admin/auth" />
        <Route element={<CustomerAuth />} path="/auth" />

        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <AdminHoc>
                <Dashboard />
              </AdminHoc>
            }
            path="/admin/dashboard"
          />
          <Route
            element={
              <AdminHoc>
                <LandingPageCMS />
              </AdminHoc>
            }
            path="/admin/landingpage"
          />
          <Route
            element={
              <AdminHoc>
                <OrderCMS />
              </AdminHoc>
            }
            path="/admin/orders"
          />
          <Route
            element={
              <AdminHoc>
                <ProductCMS />
              </AdminHoc>
            }
            path="/admin/products"
          />
          <Route
            element={
              <AdminHoc>
                {/* <Career/>
                 */}
                 <h2>go to career section</h2>
              </AdminHoc>
            }
            path="/admin/example"
          />
        </Route>
        <Route element={<ProtectedUserRoute />}>
          <Route element={<Cart />} path="/cart" />
          <Route element={<UserProfile />} path="/profile" />
          <Route element={<Checkout />} path="/checkout" />
          <Route element={<OrderSucess />} path="/ordersuccess" />
        </Route>

        <Route element={<PSP />} path="/products/search/:string" />
        <Route element={<PDP />} path="/product/:id" />
      </Routes>
    </Router>
  );
}

export default Navs;
