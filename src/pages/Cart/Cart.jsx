import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

export const deliveryFee = 0;

const Cart = () => {
  const {
    cartItems,
    food_list,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalQuantity,
  } = useContext(StoreContext);

  const totalQuantity = getTotalQuantity();
  const navigate = useNavigate();

  return (
    <div className="cart">
      {/* CART ITEMS */}
      <div className="cart-items">
        <div className="cart-items-title cart-heading">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <hr />

        {totalQuantity === 0 ? (
          <p className="NoItems">No Items in cart</p>
        ) : (
          food_list.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <React.Fragment key={item._id}>
                  <div className="cart-items-title cart-items-item">
                    <img src={item.imageUrl} alt={item.name} />

                    <p>{item.name}</p>

                    <p>${item.price}</p>

                    {/* QUANTITY CONTROLS */}
                    <div className="cart-quantity">
                      <button
                        className="qty-btn"
                        onClick={() => removeFromCart(item._id)}
                      >
                        −
                      </button>

                      <span>{cartItems[item._id]}</span>

                      <button
                        className="qty-btn"
                        onClick={() => addToCart(item._id)}
                      >
                        +
                      </button>
                    </div>

                    <p>${item.price * cartItems[item._id]}</p>

                    {/* REMOVE ITEM */}
                    <p
                      className="Remove"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <img
                        src={assets.remove_icon_cross}
                        alt="remove"
                      />
                    </p>
                  </div>
                  <hr />
                </React.Fragment>
              );
            }
            return null;
          })
        )}
      </div>

      {/* CART TOTAL */}
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>

          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>

          <hr />

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount() === 0 ? 0 : deliveryFee}</p>
          </div>

          <hr />

          <div className="cart-total-details">
            <b>Total</b>
            <b>
              $
              {getTotalCartAmount() === 0
                ? 0
                : getTotalCartAmount() + deliveryFee}
            </b>
          </div>

          <button
            disabled={getTotalCartAmount() === 0}
            onClick={() => navigate("/order")}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* PROMOCODE */}
        <div className="cart-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="Promo Code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
