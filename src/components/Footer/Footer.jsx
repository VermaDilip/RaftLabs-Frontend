import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear(); // dynamic year

  return (
    <footer id="footer">
      <div className="footer-content">
        {/* Left Section */}
        <div className="footer-content-left">
          {/* <img src={assets.logo} alt="QuickBite Logo" /> */}
          <p>
            QuickBite is your fast and reliable food delivery companion. Enjoy
            delicious meals delivered straight to your door with ease and
            convenience.
          </p>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com">
              <img src={assets.facebook_icon} alt="facebook" />
            </a>
            <a href="https://www.twitter.com">
              <img src={assets.twitter_icon} alt="twitter" />
            </a>
            <a href="https://www.linkedin.com">
              <img src={assets.linkedin_icon} alt="linkedin" />
            </a>
          </div>
        </div>

        {/* Center Section */}
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li onClick={() => navigate("/")}>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+917030473343</li>
            <li>dilipverma2202@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr />

      <p className="footer-copyright">
        &copy; {currentYear} Dilip Verma. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
