import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../context/currenTemperatureUnit";
function Main({ temperature, clothes, children, onCardClick, weatherType }) {
  const filteredClothingItems = clothes.filter(
    (item) => item.weather === weatherType
  );

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <div className="main">
      <WeatherCard temperature={temperature[currentTemperatureUnit]} />
      <p className="card__container-text">
        Today is {temperature[currentTemperatureUnit]} / You may want to wear
      </p>
      <ul className="card__container-list">
        {filteredClothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
      {children}
    </div>
  );
}

export default Main;
