import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderPlaced.css";

const OrderPlaced = () => {
  const navigate = useNavigate();

  // Auto redirect to My Orders after 3 seconds (optional)
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/myorders");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="order-placed">
      <div className="order-placed-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
          alt="success"
        />
        <h2>Order Placed Successfully 🎉</h2>
        <p>Your food is being prepared.</p>

        <button onClick={() => navigate("/myorders")}>
          View My Orders
        </button>
      </div>
    </div>
  );
};

export default OrderPlaced;
