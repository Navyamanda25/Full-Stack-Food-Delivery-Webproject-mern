import React, { useContext, useState } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../../components/FoodItem/FoodItem";
import { useTranslation } from "react-i18next";

const FOOD_KEYWORDS = [
  "biryani",
  "pizza",
  "burger",
  "pasta",
  "roll",
  "sandwich",
  "cake",
  "milkshake",
  "deathbychocolate",
  "coffee",
  "salad",
  "naan",
  "paneer",
  "butter chicken",
];

const FoodDisplay = ({ selectedRestaurant }) => {
  const { food_list, searchText, setSearchText } =
    useContext(StoreContext);
  const { t } = useTranslation();

  //  NEW: track if voice is used
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  if (!Array.isArray(food_list)) {
    return <p>Loading food items...</p>;
  }

  //  VOICE SEARCH
  const startVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice search works only in Chrome or Edge");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log("🎤 Mic listening...");
    };

    recognition.onresult = (event) => {
      const voiceText =
        event.results[0][0].transcript.toLowerCase();

      const cleanedText = voiceText
        .replace(/hi|hello|hey|please|show|me|all|food|items/g, "")
        .trim();

      const matchedFood = FOOD_KEYWORDS.find((food) =>
        cleanedText.includes(food)
      );

      if (matchedFood) {
        setSearchText(matchedFood);
        setIsVoiceActive(true); //  activate strict filter
      } else {
        //  if useless speech → reset to normal
        setSearchText("");
        setIsVoiceActive(false);
      }
    };

    recognition.start();
  };

  return (
    <div className="food-display" id="food-display">
      <h2>{t("home.topDishes")}</h2>

      {/*  SEARCH + MIC */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search food..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setIsVoiceActive(false); // ⬅ typing disables voice filter
          }}
          style={{
            padding: "10px",
            width: "260px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={startVoiceSearch}
          style={{
            border: "none",
            background: "#ff4d4d",
            color: "white",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          🎤
        </button>
      </div>

      {/*  FOOD LIST */}
      <div className="food-display-list">
        {food_list
          .filter((item) => {
            // Restaurant logic stays SAME
            const matchesRestaurant =
              selectedRestaurant === "All" ||
              item.restaurant === selectedRestaurant;

            //  ONLY restrict when voice is active
            if (isVoiceActive) {
              return (
                matchesRestaurant &&
                item.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              );
            }

            //  Normal behaviour (as before)
            const matchesSearch =
              item.name
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
              item.restaurant
                .toLowerCase()
                .includes(searchText.toLowerCase());

            return matchesRestaurant && matchesSearch;
          })
          .map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))}
      </div>
    </div>
  );
};

export default FoodDisplay;