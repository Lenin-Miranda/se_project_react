import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { useState } from "react";
function Main({
  temperature,
  clothes,
  activeModal,
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
      {activeModal === "form" && (
        <ModalWithForm
          title={"New garment"}
          name={"NewGarment"}
          buttonText={"Add garment"}
          onClose={onCloseModal}
        >
          {" "}
          <label className="modal__form-label" htmlFor="name">
            Name
            <input
              className="modal__form-input"
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              required
            />
          </label>
          <label className="modal__form-label" htmlFor="image">
            Image
            <input
              id="image"
              className="modal__form-input"
              type="url"
              name="image"
              placeholder="Image URL"
              required
            />
          </label>
          <p className="modal__form-text">Select the weather type</p>
          <div className="modal__form-container-selection">
            <label className="modal__form-label-selection" htmlFor="hot">
              <input
                className="modal__form-input  modal__form-input-type-radio"
                type="radio"
                name="weather"
                value="hot"
                id="hot"
              />
              <span className="modal__form-radius"></span>
              {"  Hot "}
            </label>
            <label className="modal__form-label-selection" htmlFor="warm">
              <input
                className="modal__form-input  modal__form-input-type-radio"
                type="radio"
                name="weather"
                value="warm"
                id="warm"
              />
              <span className="modal__form-radius"></span>
              {" Warm"}
            </label>
            <label className="modal__form-label-selection" htmlFor="cold">
              <input
                className="modal__form-input modal__form-input-type-radio"
                type="radio"
                name="weather"
                value="cold"
                id="cold"
              />
              <span className="modal__form-radius"></span>
              {" Cold"}
            </label>
          </div>
        </ModalWithForm>
      )}
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
