import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { Children, useState } from "react";
function Main({
  temperature,
  clothes,
  children,
  onCloseModal,
  selectedCard,
  onCardClick,
}) {
  return (
    <div className="main">
      <WeatherCard temperature={temperature} />
      <p className="card__container-text">
        Today is {temperature} / You may want to wear
      </p>
      <ul className="card__container-list">
        {clothes.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
      {children}
      {selectedCard && (
        <ItemModal
          name={"item-modal"}
          item={selectedCard}
          onClose={onCloseModal}
        ></ItemModal>
      )}
    </div>
  );
}

export default Main;
