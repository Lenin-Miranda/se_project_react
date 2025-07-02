import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";
function AddItemModal({ isOpen, onAddItem, onClose }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleImageUrlChange = (e) => setImageUrl(e.target.value);
  const handleWeatherChange = (e) => setWeather(e.target.value);

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
  }

  return (
    <ModalWithForm
      title="New garment"
      name="NewGarment"
      buttonText="Add garment"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__form-label" htmlFor="name">
        Name
        <input
          className="modal__form-input"
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
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
          value={imageUrl}
          onChange={handleImageUrlChange}
          required
        />
      </label>
      <p className="modal__form-text">Select the weather type</p>
      <div className="modal__form-container-selection">
        {["hot", "warm", "cold"].map((weatherOption) => (
          <label
            key={weatherOption}
            className="modal__form-label-selection"
            htmlFor={weatherOption}
          >
            <input
              className="modal__form-input modal__form-input-type-radio"
              type="radio"
              name="weather"
              value={weatherOption}
              id={weatherOption}
              onChange={handleWeatherChange}
              checked={weather === weatherOption}
            />
            <span className="modal__form-radius"></span>
            {` ${
              weatherOption.charAt(0).toUpperCase() + weatherOption.slice(1)
            }`}
          </label>
        ))}
      </div>
    </ModalWithForm>
  );
}

export default AddItemModal;
