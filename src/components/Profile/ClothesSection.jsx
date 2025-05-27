import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ clothes, onCardClick, onOpen }) {
  return (
    <div className="clothes__container">
      <div className="clothes__container-header">
        <p className="clothes__container-paragraph">You Items</p>
        <button onClick={onOpen} className="clothes__container-button">
          + Add New
        </button>
      </div>
      <ul className="card__container-list card__container-list-profile">
        {clothes.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
