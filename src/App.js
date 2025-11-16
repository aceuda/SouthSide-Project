// src/App.js
import React, { useState } from "react";

// Correct paths based on your screenshot
import { CartProvider } from "./components/context/CartContext";
import { AuthProvider } from "./components/context/AuthContext";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Pages (correct folder paths)
import LandingPage from "./components/pages/LandingPage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import CartScreen from "./components/pages/CartScreen";
import PaymentPage from "./components/pages/PaymentPage";
import ShippingPage from "./components/pages/ShippingPage";
import PrivacyPage from "./components/pages/PrivacyPage";
import ReturnPolicyPage from "./components/pages/ReturnPolicyPage";

function App() {
  const [activePage, setActivePage] = useState("landing");

  const renderPage = () => {
    switch (activePage) {
      case "login":
        return <LoginPage />;

      case "signup":
        return <SignupPage />;

      case "cart":
        return <CartScreen />;

      case "payment":
        return <PaymentPage />;

      case "shipping":
        return <ShippingPage />;

      case "privacy":
        return <PrivacyPage />;

      case "returns":
        return <ReturnPolicyPage />;

      default:
        return <LandingPage />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <Header onNavigate={setActivePage} />
        <main>{renderPage()}</main>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
