import { useEffect, useState } from "react";
import headerLogo from "./../../assets/logo.svg";
import "./Header.css";
import profielAvatar from "./../../assets/profile.svg";
import { Link, NavLink } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
function Header({ onOpen, location }) {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <header>
      <div className="header">
        <div className="header__logo-container">
          <Link to="/">
            <img src={headerLogo} alt="header logo" className="header__logo" />
          </Link>
          <p className="header__date">
            {formattedDate}, {location ?? "Loading..."}
          </p>
        </div>
        <div className="header__search-container">
          <ToggleSwitch />
          <button className="header__search-button" onClick={onOpen}>
            + Add clothes
          </button>
          <Link to={"/profile"} className="header__search-link">
            <p className="header__search-username">Lenin Miranda</p>
            <img
              className="header__search-avatar"
              src={profielAvatar}
              alt="profile picture"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
