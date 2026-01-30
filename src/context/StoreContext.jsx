import { createContext, useEffect, useState } from "react";
import { getAllMenus } from "../services/servicesApi";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // *============================================|| Fetch food items from API ||============================================* //
  const fetchFoodList = async () => {
    try {
      setLoading(true);
      const data = await getAllMenus();
      setFoodList(data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching menus:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

  //Cart logic (unchanged)
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] === 1) {
        delete updatedCart[itemId];
      } else {
        updatedCart[itemId] -= 1;
      }
      return updatedCart;
    });
  };

  const getTotalQuantity = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

 // *============================================|| Get total cart amount ||============================================* //
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

  const contextValue = {
    food_list,
    loading,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalQuantity,
    error,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
