import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  const itemCount = cartItems[id] || 0;

  return (
    <div className="food-item">
      {/* IMAGE SECTION */}
      <div className="food-item-img-container">
        <img src={image} alt={name} />

        {/* COUNTER / ADD BUTTON */}
        {itemCount > 0 ? (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              onClick={() => removeFromCart(id)}
              alt="remove"
            />
            <p>{itemCount}</p>
            <img
              src={assets.add_icon_green}
              onClick={() => addToCart(id)}
              alt="add"
            />
          </div>
        ) : (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="add"
          />
        )}
      </div>

      {/* INFO SECTION */}
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>

        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;