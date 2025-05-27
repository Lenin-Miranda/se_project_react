import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <li className="card__content" onClick={() => onCardClick(item)}>
      <p className="card__title">{item.name}</p>
      {console.log("Link de imagen:", item.imageUrl)}
      <img src={item.imageUrl} alt="clothes" className="card__image" />
    </li>
  );
}

export default ItemCard;
