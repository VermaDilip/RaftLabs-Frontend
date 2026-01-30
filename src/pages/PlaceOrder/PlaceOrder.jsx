import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import "./PlaceOrder.css";
import { deliveryFee } from "../Cart/Cart";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../services/servicesApi";

const PlaceOrder = () => {
  const { cartItems, food_list, getTotalCartAmount, setCartItems } =
    useContext(StoreContext);
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (getTotalCartAmount() === 0) return;

    // Build payload
    const itemsPayload = Object.keys(cartItems).map((itemId) => {
      const itemInfo = food_list.find((f) => f._id === itemId);
      return {
        menuItem: itemId,
        quantity: cartItems[itemId],
        price: itemInfo.price,
      };
    });

    const payload = {
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      deliveryAddress: address,
      items: itemsPayload,
    };

    try {
      setLoading(true);
      const response = await createOrder(payload);
      localStorage.setItem("orderId", response._id);
      toast.success(`Order placed successfully! Order ID: ${response._id}`);

      // Clear cart after successful order
      setCartItems({});
      // Navigate to order confirmation page or home
      navigate("/order-success");
    } catch (error) {
      console.error("Order placement error:", error);

      // 🧠 Validation errors from backend
      if (error.type === "validation" && error.errors) {
        error.errors.forEach((err) => {
          toast.error(err.msg);
        });
      } else {
        // Normal error
        toast.error(error.message || "Failed to place order");
      }
    } finally {
      setLoading(false);
    }

  };

  return (
    <>
      <button className="go-back-btn" onClick={() => navigate("/cart")}>
        ⬅ Go Back to Cart Page
      </button>

      <form className="place-order" onSubmit={handleSubmit}>
        <div className="place-order-left">
          <h2 className="title">Delivery Information</h2>
          <div className="multi-fields">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            // required
            />
          </div>
          <div className="multi-fields">
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2 className="title">Cart Total</h2>
            <div>
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
            </div>
            <button disabled={loading || getTotalCartAmount() === 0} type="submit">
              {loading ? "Placing Order..." : "PROCEED TO Payment"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
