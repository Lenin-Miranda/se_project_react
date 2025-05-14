import { useEffect, useState } from "react";
import headerLogo from "./../../assets/logo.svg";
import "./Header.css";
import profielAvatar from "./../../assets/profile.svg";
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
          <img src={headerLogo} className="header__logo" />
          <p className="header__date">
            {formattedDate}, {location ?? "Loading..."}
          </p>
        </div>
        <div className="header__search-container">
          <button className="header__search-button" onClick={onOpen}>
            + Add clothes
          </button>
          <p className="header__search-username">Lenin Miranda</p>
          <img className="header__search-avatar" src={profielAvatar} />
        </div>
      </div>
    </header>
  );
}

export default Header;
