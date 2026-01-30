import React from "react";
import "./ExploreRestaurants.css";
import RestaurantItem from "../RestaurantItem/RestaurantItem";
import { useTranslation } from "react-i18next";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;


const restaurants = [
  {
    key: "Spice Hub",
    name: "Spice Hub",
    name_te: "స్పైస్ హబ్",
    name_hi: "स्पाइस हब",
    image: `${BASE_URL}/images/restaurants/spicehub.png`,
  },
  {
    key: "Green Leaf",
    name: "Green Leaf",
    name_te: "గ్రీన్ లీఫ్",
    name_hi: "ग्रीन लीफ",
    image: `${BASE_URL}/images/restaurants/greenleaf.png`,
  },
  {
    key: "Food Corner",
    name: "Food Corner",
    name_te: "ఫుడ్ కార్నర్",
    name_hi: "फूड कॉर्नर",
    image: `${BASE_URL}/images/restaurants/foodcorner.png`,
  },
  {
    key: "Urban Bites",
    name: "Urban Bites",
    name_te: "అర్బన్ బైట్స్",
    name_hi: "अर्बन बाइट्स",
    image: `${BASE_URL}/images/restaurants/urbanbites.png`,
  },
  {
    key: "Royal Tandoor",
    name: "Royal Tandoor",
    name_te: "రాయల్ తందూర్",
    name_hi: "रॉयल तंदूर",
    image: `${BASE_URL}/images/restaurants/royaltandoor.png`,
  },
  {
    key: "Cafe Aroma",
    name: "Cafe Aroma",
    name_te: "కేఫే అరోమా",
    name_hi: "कैफे अरोमा",
    image: `${BASE_URL}/images/restaurants/cafearoma.png`,
  },
];

const ExploreRestaurants = ({ setSelectedRestaurant }) => {
  const { i18n } = useTranslation();

  const getDisplayName = (res) => {
    if (i18n.language === "te") return res.name_te;
    if (i18n.language === "hi") return res.name_hi;
    return res.name;
  };

  return (
    <div className="explore-restaurants" id="restaurants">
      <h2>Explore Restaurants</h2>

      <div className="restaurant-list">
        {restaurants.map((res) => (
          <RestaurantItem
            key={res.key}
            name={getDisplayName(res)}         
            image={res.image}
            onClick={() => setSelectedRestaurant(res.key)} 
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreRestaurants;

