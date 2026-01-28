import React, { useEffect, useState } from "react";
import "./ExploreRestaurants.css";
import RestaurantItem from "../RestaurantItem/RestaurantItem";
import axios from "axios";
import { useTranslation } from "react-i18next";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const ExploreRestaurants = ({ setSelectedRestaurant }) => {
  const [restaurants, setRestaurants] = useState([]);
  const { i18n } = useTranslation();

 
  useEffect(() => {
    fetchRestaurants();
  }, [i18n.language]);

  const fetchRestaurants = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/restaurants`);
      setRestaurants(res.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  
  const getRestaurantName = (res) => {
    if (i18n.language === "te") return res.name_te || res.name;
    if (i18n.language === "hi") return res.name_hi || res.name;
    return res.name;
  };

  return (
    <div className="explore-restaurants">
      <h2>Explore Restaurants</h2>

      <div className="restaurant-list">
        {restaurants.map((res) => {
          const displayName = getRestaurantName(res);

          return (
            <RestaurantItem
              key={res._id}
              name={displayName}
              image={res.image}
              onClick={() => setSelectedRestaurant(displayName)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExploreRestaurants;
