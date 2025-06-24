import { useEffect, useState } from "react";
import headerLogo from "./../../assets/logo.svg";
import "./Header.css";
import profielAvatar from "./../../assets/profile.svg";
import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import Profile from "../Profile/Profile";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
function Header({ onOpen, location, onOpenLogin, onOpenSignUp }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = !!currentUser;

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
          {isLoggedIn ? (
            <>
              <button className="header__search-button" onClick={onOpen}>
                + Add clothes
              </button>
              <Link to={"/profile"} className="header__search-link">
                <p className="header__search-username"> {currentUser.name}</p>
                <img
                  className="header__search-avatar"
                  src={currentUser ? currentUser.avatar : profielAvatar}
                  alt="profile picture"
                />
              </Link>
            </>
          ) : (
            <>
              <button className="header__search-button" onClick={onOpenSignUp}>
                Sign Up
              </button>

              <button className="header__search-button" onClick={onOpenLogin}>
                Log In
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
