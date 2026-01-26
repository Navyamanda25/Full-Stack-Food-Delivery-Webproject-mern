import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);

  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>{t("cart.items")}</p>
          <p>{t("cart.title")}</p>
          <p>{t("cart.price")}</p>
          <p>{t("cart.quantity")}</p>
          <p>{t("cart.total")}</p>
          <p>{t("cart.remove")}</p>
        </div>

        <br />
        <hr />

        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p
                    onClick={() => removeFromCart(item._id)}
                    className="cross"
                  >
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>{t("cart.cartTotals")}</h2>

          <div>
            <div className="cart-total-details">
              <p>{t("cart.subtotal")}</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>{t("cart.tax")}</p>
              <p>
                ₹
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() * 0.1}
              </p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>{t("cart.deliveryFee")}</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <b>{t("cart.grandTotal")}</b>
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

          <button onClick={() => navigate('/place-order')}>
            {t("cart.checkout")}
          </button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>{t("cart.promoText")}</p>

            <div className="cart-promocode-input">
              <input
                type="text"
                placeholder={t("cart.promoPlaceholder")}
              />
              <button>{t("cart.submit")}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
