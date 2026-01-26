import { useEffect, useState } from "react";
import axios from "axios";
import "./MyOrders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  // ✅ FIX 1: use env instead of hardcoded URL
  const url = import.meta.env.VITE_BACKEND_URL;

  // 🔹 Fetch orders
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${url}/api/order/myorders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data.orders);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Mark order as delivered
  const markAsDelivered = async (orderId) => {
    try {
      const token = localStorage.getItem("token");

      // ✅ FIX 2: add Authorization header
      await axios.put(
        `${url}/api/order/deliver/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <p><b>Status:</b> {order.status}</p>
          <p><b>Total:</b> ₹{order.totalAmount}</p>

          {order.items.map((item, i) => (
            <div key={i} className="order-item">
              <img src={item.image} alt={item.name} />
              <p>
                {item.name} × {item.quantity}
              </p>
            </div>
          ))}

          {order.status !== "Delivered" && (
            <button onClick={() => markAsDelivered(order._id)}>
              Mark as Delivered
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;