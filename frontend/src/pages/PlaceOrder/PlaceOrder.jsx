import React, { useContext } from 'react';
import './PlaceOrder.css';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { useTranslation } from 'react-i18next';

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const { t } = useTranslation();

  return (
    <form className="place-order">
      {/* LEFT SIDE */}
      <div className="place-order-left">
        <p className="title">{t("placeOrder.deliveryInfo")}</p>

        <div className="multi-fields">
          <input type="text" placeholder={t("placeOrder.firstName")} />
          <input type="text" placeholder={t("placeOrder.lastName")} />
        </div>

        <input type="email" placeholder={t("placeOrder.email")} />
        <input type="text" placeholder={t("placeOrder.street")} />

        <div className="multi-fields">
          <input type="text" placeholder={t("placeOrder.city")} />
          <input type="text" placeholder={t("placeOrder.state")} />
        </div>

        <div className="multi-fields">
          <input type="text" placeholder={t("placeOrder.zip")} />
          <input type="text" placeholder={t("placeOrder.country")} />
        </div>

        <input type="text" placeholder={t("placeOrder.phone")} />
      </div>

      {/* RIGHT SIDE */}
      <div className="place-order-right">
        <div className="cart-total">
          <h2>{t("placeOrder.cartTotals")}</h2>

          <div>
            <div className="cart-total-details">
              <p>{t("placeOrder.subtotal")}</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>{t("placeOrder.tax")}</p>
              <p>
                ₹
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() * 0.1}
              </p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>{t("placeOrder.deliveryFee")}</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <b>{t("placeOrder.total")}</b>
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

          <Link to="/payment">
            <button>{t("placeOrder.proceedPayment")}</button>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
