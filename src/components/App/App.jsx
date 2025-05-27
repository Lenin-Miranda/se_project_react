import { useState, useEffect } from "react";
import "./App.css";
import Main from "../Main/Main";
import Header from "../header/Header";
import Footer from "../Footer/footer";
import {
  fetchWeatherByCoords,
  fetchCityByCoords,
} from "../../utils/WeatherApi";
import getWeatherType, {
  DEFAULT_COORDS,
  defaultClothingItems,
} from "../../utils/constants";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentTemperatureUnitContext from "../../context/currenTemperatureUnit";
import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, deleteItem, addItem } from "../../utils/Api";

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [location, setLocation] = useState(null);
  const [temperature, setTemperature] = useState({});
  const [city, setCity] = useState(null);
  const [weatherType, setWeatherType] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  useEffect(() => {
    const { latitude, longitude } = DEFAULT_COORDS;
    setLocation({ lat: latitude, lon: longitude });

    fetchWeatherByCoords(latitude, longitude)
      .then((data) => {
        const weather = {
          temperature: {
            F: `${Math.round(data.main.temp)} °F`,
            C: `${Math.round((data.main.temp - 32) * (5 / 9))} °C`,
          },
        };
        setTemperature(weather.temperature);
        setWeatherType(getWeatherType(data.main.temp));
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

  useEffect(() => {
    getItems()
      .then((itemsFromServer) => {
        setClothingItems(itemsFromServer);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
      });
  }, []);

  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  }

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

  function handleDeleteItem(_id) {
    deleteItem(_id)
      .then(() => {
        const updatedItems = clothingItems.filter((item) => item._id !== _id);
        setClothingItems(updatedItems);
        handleOnClose();
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
      });
  }

  function handleAddItemSubmit({ name, imageUrl, weather }) {
    console.log({ name, imageUrl, weather });
    addItem({ name, imageUrl, weather })
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        handleOnClose();
      })
      .catch((err) => {
        console.error("Erro adding item:", err);
      });
  }

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header onOpen={() => handleOpenModal("form")} location={city}></Header>

        <Routes>
          <Route
            path="/se_project_react/"
            element={
              <Main
                temperature={temperature}
                clothes={clothingItems}
                selectedCard={selectedCard}
                onCloseModal={handleOnClose}
                onCardClick={handleOnCardClick}
                weatherType={weatherType}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <Profile
                clothes={clothingItems}
                onCardClick={handleOnCardClick}
                onOpen={() => handleOpenModal("form")}
              />
            }
          />
        </Routes>
        <AddItemModal
          isOpen={activeModal === "form"}
          onAddItem={handleAddItemSubmit}
          onClose={handleOnClose}
        />

        {selectedCard &&
          (console.log("selectedCard:", { selectedCard }),
          (
            <ItemModal
              name="item-modal"
              item={selectedCard}
              onClose={handleOnClose}
              onDeleteItem={handleDeleteItem}
            />
          ))}

        <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
