import React from "react";
import "./ExploreRestaurants.css";
import RestaurantItem from "../RestaurantItem/RestaurantItem";


const BASE_URL = import.meta.env.VITE_BACimport React, { useEffect, useState } from "react";
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
      const res = await axios.get(
        `${BASE_URL}/api/restaurants?lang=${i18n.language}`
      );
      setRestaurants(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="explore-restaurants">
      <h2>Explore Restaurants</h2>

      <div className="restaurant-list">
        {restaurants.map((res) => (
          <RestaurantItem
            key={res._id}
            name={res.displayName} 
            image={res.image}
            onClick={() => setSelectedRestaurant(res.displayName)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreRestaurants;
KEND_URL;

const restaurants = [
  {
    name: "Spice Hub",
    image: `${BASE_URL}/images/restaurants/spicehub.png`,
  },
  {
    name: "Green Leaf",
    image: `${BASE_URL}/images/restaurants/greenleaf.png`,
  },
  {
    name: "Food Corner",
    image: `${BASE_URL}/images/restaurants/foodcorner.png`,
  },
  {
    name: "Urban Bites",
    image: `${BASE_URL}/images/restaurants/urbanbites.png`,
  },
  {
    name: "Royal Tandoor",
    image: `${BASE_URL}/images/restaurants/royaltandoor.png`,
  },
   {
    name: "Cafe Aroma",
    image: `${BASE_URL}/images/restaurants/cafearoma.png`,
  },
];

const ExploreRestaurants = ({ setSelectedRestaurant }) => {
  return (
    <div className="explore-restaurants">
      <h2>Explore Restaurants</h2>

      <div className="restaurant-list">
        {restaurants.map((res, index) => (
          <RestaurantItem
            key={index}
            name={res.name}
            image={res.image}
            onClick={() => setSelectedRestaurant(res.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreRestaurants;
