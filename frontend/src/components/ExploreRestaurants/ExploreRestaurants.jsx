import React from "react";
import "./ExploreRestaurants.css";
import RestaurantItem from "../RestaurantItem/RestaurantItem";


const BASE_URL = import.meta.env.VITE_BACKEND_URL;

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