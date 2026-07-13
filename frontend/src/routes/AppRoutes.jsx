import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Profile from "../pages/Profile";
import ProductDetails from "../pages/ProductDetails";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";
import Checkout from "../pages/Checkout";
import MyOrders from "../pages/MyOrders";
import OrderDetails from "../pages/OrderDetails";
import AdminOrders from "../pages/AdminOrders";
import AdminDashboard from "../pages/AdminDashboard";
import AdminProducts from "../pages/AdminProducts";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import AdminBrands from "../pages/AdminBrands";
import Shop from "../pages/Shop";
import AdminCategories from "../pages/AdminCategories";
import AdminUsers from "../pages/AdminUsers";
import AdminLayout from "../layouts/AdminLayout";
import About from "../pages/About";
import Contact from "../pages/Contact";
import AdminMessages from "../pages/AdminMessages";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
function AppRoutes() {
  return (
    <Routes>
      {/* Main Website */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/my-orders"
          element={<MyOrders />}
        />

        <Route
          path="/orders/:id"
          element={<OrderDetails />}
        />

        <Route path="/shop" element={<Shop />} />
      </Route>

      {/* Admin Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route
          path="dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="orders"
          element={<AdminOrders />}
        />

        <Route
          path="products"
          element={<AdminProducts />}
        />

        <Route
          path="products/add"
          element={<AddProduct />}
        />

        <Route
          path="products/edit/:id"
          element={<EditProduct />}
        />

        <Route
          path="brands"
          element={<AdminBrands />}
        />

        <Route
          path="categories"
          element={<AdminCategories />}
        />

        <Route
          path="users"
          element={<AdminUsers />}
        />
      
      <Route
  path="messages"
  element={
    
      <AdminMessages />
  
  }
/>
</Route>

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;