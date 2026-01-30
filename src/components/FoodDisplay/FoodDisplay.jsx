import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list, loading, error } = useContext(StoreContext);

  if (loading) {
    return <h3>Loading dishes...</h3>;
  }

  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes Near You</h2>

      <div className="food-display-list">
        {food_list.length === 0 && <p>{error}</p>}

        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={item._id || index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.imageUrl}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
