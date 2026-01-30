import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="header-contents">
        <h2>Order Fresh Burgers & Pizzas Online</h2>
        <p>
          Craving something delicious? Choose from our freshly made burgers and cheesy pizzas, prepared with quality ingredients and delivered hot to your doorstep.
        </p>
        <a href="#explore-menu">
          <button>View Menu</button>
        </a>
      </div>
    </header>
  );
};

export default Header;
