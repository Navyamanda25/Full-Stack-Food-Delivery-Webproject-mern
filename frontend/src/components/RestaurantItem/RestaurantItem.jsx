import React from "react";
import "./RestaurantItem.css";

const RestaurantItem = ({ name, image, onClick }) => {
  return (
    <div className="restaurant-item" onClick={onClick}>
      <div className="restaurant-img-container">
        <img src={image} alt={name} />
      </div>
      <p className="restaurant-name">{name}</p>
    </div>
  );
};

export default RestaurantItem;
