import { useState, useEffect } from "react";
import "./App.css";
import Main from "../Main/Main";
import Header from "../header/Header";
import Footer from "../Footer/footer";
import {
  fetchWeatherByCoords,
  fetchCityByCoords,
} from "../../utils/WeatherApi";
import getWeatherType from "../../utils/constants";
import { DEFAULT_COORDS } from "../../utils/constants";
import { defaultClothingItems } from "../../utils/constants";

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [location, setLocation] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [city, setCity] = useState(null);
  const [weatherType, setWeatherType] = useState(null);

  useEffect(() => {
    const { latitude, longitude } = DEFAULT_COORDS;
    setLocation({ lat: latitude, lon: longitude });

    fetchWeatherByCoords(latitude, longitude)
      .then((data) => {
        const tempValue = data.main.temp;
        setTemperature(Math.round(tempValue) + "°F");
        setWeatherType(getWeatherType(tempValue));
      })
      .catch((err) => console.error("Weather error:", err));

    fetchCityByCoords(latitude, longitude)
      .then((data) => {
        if (data[0]?.name) {
          setCity(data[0].name);
        }
      })
      .catch((err) => console.error("City fetch error:", err));
  }, []);

  function handleOnCardClick(item) {
    setSelectedCard(item);
    setActiveModal("item");
  }
  function handleOnClose() {
    setActiveModal(null);
    setSelectedCard(null);
  }

  function handleOpenModal(modalName) {
    setActiveModal(modalName);
  }

  const filteredClothingItems = defaultClothingItems.filter(
    (item) => item.weather === weatherType
  );

  return (
    <>
      <div className="page">
        <Header onOpen={() => handleOpenModal("form")} location={city} />

        <Main
          temperature={temperature}
          clothes={filteredClothingItems}
          selectedCard={selectedCard}
          onCloseModal={handleOnClose}
          onCardClick={handleOnCardClick}
        >
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
        </Main>

        <Footer />
      </div>
    </>
  );
}

export default App;
