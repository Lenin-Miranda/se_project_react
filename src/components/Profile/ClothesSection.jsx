import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function ClothesSection({ clothes, onCardClick, onOpen, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  // Filtrar solo las cartas que pertenecen al usuario actual
  const userClothes = clothes.filter((item) => item.owner === currentUser?._id);

  return (
    <>
      {currentUser ? (
        <div className="clothes__container">
          <div className="clothes__container-header">
            <p className="clothes__container-paragraph">Your Items</p>
            <button onClick={onOpen} className="clothes__container-button">
              + Add New
            </button>
          </div>
          <ul className="card__container-list card__container-list-profile">
            {userClothes.map((item, index) => {
              return (
                <ItemCard
                  key={index}
                  item={item}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                />
              );
            })}
          </ul>
        </div>
      ) : null}
    </>
  );
}

export default ClothesSection;
