import profielAvatar from "./../../assets/profile.svg";
import "./Sidebar.css";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function Sidebar({ children, logOut, onOpen }) {
  const currentUser = useContext(CurrentUserContext);
  if (!currentUser) {
    return (
      <div className="sidebar">
        <p className="sidebar__message">
          Please sign up or sign in to see your profile
        </p>
      </div>
    );
  }

  const isLoggedIn = !!currentUser;

  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div className="sidebar__container-header">
          <img
            className="sidebar__container-header-image"
            src={currentUser.avatar || profielAvatar}
            alt="Profile avatar"
          />
          <h2 className="sidebar__container-header-title">
            {currentUser.name}
          </h2>
        </div>
        <div className="sidebar__container-options">
          <button
            className="sidebar__container-options-btn"
            onClick={onOpen}
            type="button"
          >
            Change profile data
          </button>
          <button
            className="sidebar__container-options-btn"
            onClick={logOut}
            type="button"
          >
            Log Out
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Sidebar;
