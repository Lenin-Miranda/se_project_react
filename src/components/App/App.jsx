import { useState, useEffect } from "react";
import "./App.css";
import Main from "../Main/Main";
import Header from "../header/Header";
import Footer from "../Footer/footer";
import { fetchWeatherByCoords, fetchCityByCoords } from "../../utils/constants";
import getWeatherType from "../../utils/constants";

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [location, setLocation] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [city, setCity] = useState(null);
  const [weatherType, setWeatherType] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
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
          .catch((err) => console.error("city fetch error:", err));
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
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

  const defaultClothingItems = [
    {
      _id: 0,
      name: "Cap",
      weather: "hot",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
    },
    {
      _id: 1,
      name: "Hoodie",
      weather: "warm",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
    },
    {
      _id: 2,
      name: "Jacket",
      weather: "cold",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
    },
    {
      _id: 3,
      name: "Sneakers",
      weather: "cold",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
    },
    {
      _id: 4,
      name: "T-Shirt",
      weather: "hot",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
    },
    {
      _id: 5,
      name: "Coat",
      weather: "cold",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
    },
  ];
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
          activeModal={activeModal}
          selectedCard={selectedCard}
          onCloseModal={handleOnClose}
          onCardClick={handleOnCardClick}
        />

        <Footer />
      </div>
    </>
  );
}

export default App;
