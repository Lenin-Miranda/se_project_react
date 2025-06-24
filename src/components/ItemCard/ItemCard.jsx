import { useState } from "react";
import "./ItemCard.css";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.includes(currentUser?._id);
  const likeButtonClassName = `item__like-button ${
    isLiked ? "item__like-button_active" : ""
  }`;

  return (
    <li className="card__content" onClick={() => onCardClick(item)}>
      <div className="card__container-content">
        <p className="card__title">{item.name}</p>
        <button
          className="card__btn"
          onClick={(e) => {
            e.stopPropagation();
            onCardLike(item);
          }}
        >
          {isLiked ? (
            <BsHeartFill size={20} className={likeButtonClassName} />
          ) : (
            <BsHeart size={20} className={likeButtonClassName} />
          )}
        </button>
      </div>
      <img src={item.imageUrl} alt={item.name} className="card__image" />
    </li>
  );
}

export default ItemCard;
