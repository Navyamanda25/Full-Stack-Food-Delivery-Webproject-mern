import React, { useContext } from "react";
import "./Payment.css";
import { StoreContext } from "../../context/StoreContext";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const {
    cartItems,
    food_list,
    getTotalCartAmount,
    url,
    setCartItems,
  } = useContext(StoreContext);

  const { t } = useTranslation();
  const navigate = useNavigate();

  // ================= CHECKOUT HANDLER =================
  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first to place order");
        return;
      }

      // Prepare order items
      const items = food_list
        .filter((item) => cartItems[item._id] > 0)
        .map((item) => ({
          foodId: item._id,
          name: item.name,
          price: item.price,
          quantity: cartItems[item._id],
          image: item.image,
          restaurantId: item.restaurantId || item.restaurant, //  REQUIRED
        }));

      if (items.length === 0) {
        alert("Cart is empty");
        return;
      }

      //  Extract restaurantId from first item
      const restaurantId = items[0].restaurantId;

      if (!restaurantId) {
        alert("Restaurant ID missing for this order");
        return;
      }

      const subtotal = getTotalCartAmount();
      const tax = subtotal * 0.1;
      const deliveryFee = 2;
      const totalAmount = subtotal + tax + deliveryFee;

      // Place order API
      const response = await axios.post(
        `${url}/api/order/place`,
        {
          items,
          totalAmount,
          restaurantId, //  SEND REQUIRED FIELD
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Order placed successfully!");
        setCartItems({});
        navigate("/order-placed");
      } else {
        alert("Order failed");
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="payment">
      <div className="window">
        {/* ================= ORDER SUMMARY ================= */}
        <div className="payment-order-info">
          <div className="payment-order-info-content">
            <h2>{t("payment.orderSummary")}</h2>
            <hr />

            <div className="payment-cart-items">
              {food_list.map((item) => {
                if (cartItems[item._id] > 0) {
                  return (
                    <div
                      key={item._id}
                      className="payment-cart-items-title payment-cart-items-item"
                    >
                      <img src={item.image} alt={item.name} />
                      <p className="name">
                        {item.name}
                        <br />
                        <span>
                          {t("payment.quantity")}: {cartItems[item._id]}
                        </span>
                      </p>
                      <p className="price">
                        ₹{item.price * cartItems[item._id]}
                      </p>
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {/* ================= TOTAL ================= */}
            <div className="payment-cart-total cart-total">
              <div>
                <div className="cart-total-details">
                  <p>{t("payment.subtotal")}</p>
                  <p>₹{getTotalCartAmount()}</p>
                </div>

                <hr />

                <div className="cart-total-details">
                  <p>{t("payment.tax")}</p>
                  <p>
                    ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() * 0.1}
                  </p>
                </div>

                <hr />

                <div className="cart-total-details">
                  <p>{t("payment.deliveryFee")}</p>
                  <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
                </div>

                <hr />

                <div className="cart-total-details">
                  <b>{t("payment.total")}</b>
                  <b>
                    ₹
                    {getTotalCartAmount() === 0
                      ? 0
                      : getTotalCartAmount() +
                        getTotalCartAmount() * 0.1 +
                        2}
                  </b>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= PAYMENT CARD ================= */}
        <div className="credit-info">
          <div className="credit-info-content">
            <img
              src="https://dl.dropboxusercontent.com/s/2vbqk5lcpi7hjoc/MasterCard_Logo.svg.png"
              height="80"
              className="credit-card-image"
              alt="card"
            />

            <p>{t("payment.cardNumber")}</p>
            <input className="input-field" placeholder="1234 5678 9012 3456" />

            <p>{t("payment.cardHolder")}</p>
            <input className="input-field" placeholder="Your Name" />

            <table className="half-input-table">
              <tbody>
                <tr>
                  <td>
                    {t("payment.expires")}
                    <input className="input-field" placeholder="MM/YY" />
                  </td>
                  <td>
                    {t("payment.cvc")}
                    <input className="input-field" placeholder="123" />
                  </td>
                </tr>
              </tbody>
            </table>

            <button className="pay-btn" onClick={handleCheckout}>
              {t("payment.checkout")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
