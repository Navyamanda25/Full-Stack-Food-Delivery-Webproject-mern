import React, { useEffect, useState } from "react";
import "./ExploreMenu.css";
import { useTranslation } from "react-i18next";

const ExploreMenu = ({ selectedRestaurant, setSelectedRestaurant }) => {
  const [restaurants, setRestaurants] = useState([]);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/restaurants`)
      .then((res) => res.json())
      .then((data) =>
        setRestaurants(
          data.map((r) => ({
            ...r,
           
            name: r.displayName || r.name,
          }))
        )
      );
  }, [i18n.language]);

  const getDisplayName = (r) => {
    if (i18n.language === "te") return r.name_te || r.name;
    if (i18n.language === "hi") return r.name_hi || r.name;
    return r.name;
  };

  return (
    <div className="explore-menu" id="restaurants">
      <h2 className="section-title">{t("home.exploreRestaurants")}</h2>

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
            <p>{getDisplayName(r)}</p> {/*  Translated label */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;
