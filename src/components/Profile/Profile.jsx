import ClothesSection from "./ClothesSection";
import Sidebar from "./Sidebar";
import "./Profile.css";
function Profile({ clothes, onCardClick, onOpen }) {
  return (
    <div className="profile">
      <Sidebar></Sidebar>
      <ClothesSection
        clothes={clothes}
        onCardClick={onCardClick}
        onOpen={onOpen}
      ></ClothesSection>
    </div>
  );
}

export default Profile;
