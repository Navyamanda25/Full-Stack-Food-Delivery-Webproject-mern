import React, { useEffect, useState } from "react";
import "./ExploreMenu.css";
import { useTranslation } from "react-i18next";

const ExploreMenu = ({ selectedRestaurant, setSelectedRestaurant }) => {
  const [restaurants, setRestaurants] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/restaurants`)
      .then((res) => res.json())
      .then((data) => setRestaurants(data));
  }, []);

  return (
    <div className="explore-menu" id="restaurants">
      <h2 className="section-title">
        {t("home.exploreRestaurants")}
      </h2>

      {/* Restaurant List ONLY */}
      <div className="explore-menu-list">
        {restaurants.map((r) => (
          <div
            key={r._id}
            className={`explore-menu-list-item ${
              selectedRestaurant === r.name ? "active" : ""
            }`}
            onClick={() => setSelectedRestaurant(r.name)}
          >
            <img src={r.image} alt={r.name} />
            <p>{r.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;