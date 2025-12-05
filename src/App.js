// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { CartProvider } from "./context/CartContext";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import PaymentPage from "./pages/PaymentPage";
import ShippingPage from "./pages/ShippingPage";
import ReturnPolicyPage from "./pages/ReturnPolicyPage";
import MenuPage from "./pages/MenuPage";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import AdminProducts from "./pages/AdminProducts";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
import FavouritesPage from "./pages/FavouritesPage";
import SettingsPage from "./pages/SettingsPage";

const App = () => {
  return (
    <CartProvider>
      <div className="app">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/shop" element={<MenuPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/cart" element={<CartPage />} />

            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/favorites" element={<FavouritesPage />} />
            <Route path="/settings" element={<SettingsPage />} />

            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/returns" element={<ReturnPolicyPage />} />
            <Route path="/admin/products" element={<AdminProducts />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;
