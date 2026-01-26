import React, { useState, useContext } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.png';
import basket_icon from '../../assets/basket_icon.png';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../LanguageSelector';

const Navbar = ({ setShowLogin }) => {
  const { t } = useTranslation();
  const [menu, setMenu] = useState("home");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  //  SEARCH CONTEXT
  const {
    getTotalCartAmount,
    token,
    setToken,
    searchText,
    setSearchText
  } = useContext(StoreContext);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setDropdownOpen(false);
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>

      {/* Menu */}
      <ul className="navbar-menu">
        <li>
          <Link to="/" className={menu === "home" ? "active" : ""}>
            {t("navbar.home")}
          </Link>
        </li>
        <li>
  <a href="#restaurants">
    {t("navbar.menu")}
  </a>
</li>


        <li>
          <a href="#app-download">{t("navbar.mobileApp")}</a>
        </li>
        <li>
          <a href="#footer">{t("navbar.contact")}</a>
        </li>
      </ul>

      {/* Right Side */}
      <div className="navbar-right">
        <LanguageSelector />

        {/*  SEARCH BOX */}
        <div className="navbar-search">
          <img src={search_icon} alt="Search" />
          <input
            type="text"
            placeholder="Search restaurant or food..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* Cart */}
        <div className="navbar-cart-icon">
          <Link to="/cart">
            <img src={basket_icon} alt="Basket" />
          </Link>
          {getTotalCartAmount() > 0 && <div className="dot"></div>}
        </div>

        {/* Auth */}
        {!token ? (
          <button onClick={() => setShowLogin(true)}>
            {t("navbar.signIn")}
          </button>
        ) : (
          <div className="navbar-profile">
            <img
              src={assets.profile_icon}
              alt="Profile"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            {dropdownOpen && (
              <ul className="nav-profile-dropdown">
                <li>{t("navbar.profile")}</li>
                <li>{t("navbar.orders")}</li>
                <hr />
                <li onClick={handleLogout}>{t("navbar.logout")}</li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
