import ClothesSection from "./ClothesSection";
import Sidebar from "./Sidebar";
import "./Profile.css";
function Profile({
  clothes,
  onCardClick,
  onOpen,
  logOut,
  onOpenProfile,
  onCardLike,
}) {
  return (
    <div className="profile">
      <Sidebar onOpen={onOpenProfile} logOut={logOut}></Sidebar>
      <ClothesSection
        clothes={clothes}
        onCardClick={onCardClick}
        onOpen={onOpen}
        onCardLike={onCardLike}
      ></ClothesSection>
    </div>
  );
}

export default Profile;
