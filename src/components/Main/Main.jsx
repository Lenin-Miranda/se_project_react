import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";

function Main({ temperature, clothes, children, onCardClick, weatherType }) {
  const filteredClothingItems = clothes.filter(
    (item) => item.weather === weatherType
  );
  return (
    <div className="main">
      <WeatherCard temperature={temperature} />
      <p className="card__container-text">
        Today is {temperature} / You may want to wear
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
