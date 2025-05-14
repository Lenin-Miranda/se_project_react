import "./ItemCard.css";
import shirt from "../../assets/T-shirt.jpg";

function ItemCard({ item, onCardClick }) {
  return (
    <li className="card__content" onClick={() => onCardClick(item)}>
      <p className="card__title">{item.name}</p>
      <img src={item.link} alt="clothes" className="card__image" />
    </li>
  );
}

export default ItemCard;
