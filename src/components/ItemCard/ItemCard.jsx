import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <li className="card__content" onClick={() => onCardClick(item)}>
      <p className="card__title">{item.name}</p>

      <img src={item.imageUrl} alt={item.name} className="card__image" />
    </li>
  );
}

export default ItemCard;
