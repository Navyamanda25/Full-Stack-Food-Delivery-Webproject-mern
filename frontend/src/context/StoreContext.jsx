import { createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // ================= LANGUAGE =================
  const { i18n } = useTranslation();

  // ================= STATES =================
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchText, setSearchText] = useState("");

  // ================= BACKEND URL =================
  const url = import.meta.env.VITE_BACKEND_URL;

  // ================= FETCH FOOD =================
  const fetchFoodList = async () => {
    try {
      const response = await fetch(
        `${url}/api/food/list?lang=${i18n.language}`
      );

      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        setFoodList(result.data);
      } else {
        console.error("Unexpected food API response:", result);
        setFoodList([]);
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
      setFoodList([]);
    }
  };

  // 🔥 Refetch food whenever language changes
  useEffect(() => {
    fetchFoodList();
  }, [i18n.language]);

  // ================= CART FUNCTIONS =================
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;

      const updated = { ...prev, [itemId]: prev[itemId] - 1 };

      if (updated[itemId] <= 0) {
        delete updated[itemId];
      }

      return updated;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = food_list.find(
        (product) => product._id === itemId
      );

      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[itemId];
      }
    }

    return totalAmount;
  };

  // ================= CONTEXT VALUE =================
  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    setCartItems,
    getTotalCartAmount,
    searchText,
    setSearchText,
    url,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
