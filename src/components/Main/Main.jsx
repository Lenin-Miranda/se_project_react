import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../context/currentTemperatureUnit";
function Main({
  temperature,
  clothes,
  children,
  onCardClick,
  weatherType,
  onCardLike,
}) {
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
        {filteredClothingItems.map((item, index) => {
          return (
            <ItemCard
              key={index}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
      {children}
    </div>
  );
}

export default Main;
