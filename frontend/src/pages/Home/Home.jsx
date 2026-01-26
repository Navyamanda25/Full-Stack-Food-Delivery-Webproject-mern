import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Home.css";

import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";

const Home = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState("All");
  const location = useLocation();

  //  Auto-scroll when clicking "Restaurants"
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="home">
      <Header />

      <ExploreMenu
        selectedRestaurant={selectedRestaurant}
        setSelectedRestaurant={setSelectedRestaurant}
      />

      <FoodDisplay selectedRestaurant={selectedRestaurant} />

      <AppDownload />
    </div>
  );
};

export default Home;
