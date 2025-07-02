import { useState, useEffect } from "react";
import "./App.css";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/footer";
import {
  fetchWeatherByCoords,
  fetchCityByCoords,
} from "../../utils/WeatherApi";
import { getWeatherType, DEFAULT_COORDS } from "../../utils/constants";
import SignIn from "../SignIn/SignIn";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentTemperatureUnitContext from "../../context/currentTemperatureUnit";
import { Route, Routes, Navigate } from "react-router-dom";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import {
  getItems,
  deleteItem,
  addItem,
  addCardLike,
  removeCardLike,
} from "../../utils/Api";
import { login, signup, getCurrentUser, updateProfile } from "../../utils/auth";
import LogIn from "../LogIn/LogInModal";
import CurrentUserContext from "../../context/CurrentUserContext";
import ProfileData from "../Profile/ProfileData";
import ProtectedRoute from "./ProtectedRoute";
function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState({});
  const [city, setCity] = useState(null);
  const [weatherType, setWeatherType] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState({ email: "", password: "" });

  // Derivar isLogIn del currentUser para mantener consistencia
  const isLogIn = !!currentUser;

  function handleOpenSignIn() {
    setActiveModal("signin");
  }
  function handleOpenLogIn() {
    setActiveModal("login");
  }
  function handleOpenProfile() {
    setActiveModal("profile");
  }

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
        setCity(data.name);
      })
      .catch((err) => console.error("Weather error:", err));
  }, []);

  useEffect(() => {
    getItems()
      .then((itemsFromServer) => {
        setClothingItems(itemsFromServer);
        console.log("Clothing items from API:", itemsFromServer);
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
    addItem({ name, imageUrl, weather })
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        handleOnClose();
      })
      .catch((err) => {
        console.error("Error adding item:", err);
      });
  }

  function handleRegistration({ name, email, password, avatar }) {
    signup({ name, email, password, avatar })
      .then((res) => {
        return handleLogin({ email, password });
      })
      .catch((err) => {
        console.error("Error al registrar:", err);
      });
  }

  function handleLogin({ email, password }) {
    if (!email || !password) {
      return;
    }
    login({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          // Obtener los datos completos del usuario después del login
          return getCurrentUser();
        }
      })
      .then((userData) => {
        if (userData) {
          setCurrentUser(userData);
          setActiveModal(null);
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        // Limpiar token si hay error
        localStorage.removeItem("token");
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Verificar el token y obtener los datos del usuario
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.error("Error validando token:", err);
        localStorage.removeItem("token"); // borra el token si no es válido
        setCurrentUser(null);
      });
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setCurrentUser(null);
  }

  function handleCardLike(item) {
    if (!currentUser) return; // Si no hay usuario logueado, no se puede dar like
    const isLiked = item.likes && item.likes.includes(currentUser._id);
    const action = isLiked ? removeCardLike : addCardLike;

    action(item._id)
      .then((updatedCard) => {
        setClothingItems((prevItems) =>
          prevItems.map((card) => (card._id === item._id ? updatedCard : card))
        );
      })
      .catch((err) => console.error("Error handling like:", err));
  }

  function handleUpdateProfile({ name, avatar }) {
    updateProfile({ name, avatar })
      .then((updatedUser) => {
        // Preservar el _id del usuario actual si el servidor no lo devuelve
        const userToSet = {
          ...updatedUser,
          _id: updatedUser._id || currentUser._id,
        };

        setCurrentUser(userToSet);
        handleOnClose();
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            onOpen={() => handleOpenModal("form")}
            location={city}
            onOpenLogin={handleOpenLogIn}
            onOpenSignUp={handleOpenSignIn}
            currentUser={currentUser}
          ></Header>

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  temperature={temperature}
                  clothes={clothingItems}
                  onCloseModal={handleOnClose}
                  onCardClick={handleOnCardClick}
                  weatherType={weatherType}
                  onCardLike={handleCardLike}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLogIn}>
                  <Profile
                    clothes={clothingItems}
                    onCardClick={handleOnCardClick}
                    onOpen={() => handleOpenModal("form")}
                    logOut={handleLogout}
                    onOpenProfile={handleOpenProfile}
                    onCardLike={handleCardLike}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <AddItemModal
            isOpen={activeModal === "form"}
            onAddItem={handleAddItemSubmit}
            onClose={handleOnClose}
          />

          <ItemModal
            name="item-modal"
            item={selectedCard}
            onClose={handleOnClose}
            onDeleteItem={handleDeleteItem}
            isOpen={activeModal === "item"}
          />

          <LogIn
            name="login-modal"
            onClose={handleOnClose}
            isOpen={activeModal === "login"}
            onOpenSignIn={handleOpenSignIn}
            onOpenLogIn={handleOpenLogIn}
            onLogin={handleLogin}
          />

          <SignIn
            name="signin-modal"
            onClose={handleOnClose}
            isOpen={activeModal === "signin"}
            onOpenSignIn={handleOpenSignIn}
            onOpenLogIn={handleOpenLogIn}
            onSignIn={handleRegistration}
          />

          <ProfileData
            name="profile-data-modal"
            onClose={handleOnClose}
            isOpen={activeModal === "profile"}
            onUpdateProfile={handleUpdateProfile}
          />

          <Footer />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
