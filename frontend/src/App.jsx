import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";

import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Payment from "./pages/Payment/Payment";
import OrderPlaced from "./pages/OrderPlaced/OrderPlaced";
import MyOrders from "./pages/MyOrders/MyOrders";

import VoiceAssistant from "./components/VoiceAssistant";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Login Popup */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className="app">
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order-placed" element={<OrderPlaced />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>

        <Footer />
      </div>

      {/*  ADD VOICE ASSISTANT HERE */}
      <VoiceAssistant />
    </>
  );
};

export default App;