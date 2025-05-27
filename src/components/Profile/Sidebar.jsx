import profielAvatar from "./../../assets/profile.svg";
import "./Sidebar.css";
function Sidebar({ children }) {
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div className="sidebar__container-header">
          <img
            className="sidebar__container-header-image"
            src={profielAvatar}
          />
          <h2 className="sidebar__container-header-title">Lenin Miranda</h2>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Sidebar;
