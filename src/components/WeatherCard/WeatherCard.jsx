import "./WeatherCard.css";
import sun from "../../assets/Ellipse.svg";
import cloud from "../../assets/union.svg";
import { useState } from "react";

function WeatherCard({ temperature }) {
  return (
    <>
      <div className="weather__card">
        <div className="weather__card-container">
          <p className="weather__temperature">{temperature}</p>
        </div>
        <div className="weather__card-image-container">
          <img
            className="weather__card-image weather__card-image_type_cloud"
            src={cloud}
          />
          <img
            className="weather__card-image weather__card-image_type_sun"
            src={sun}
          />
        </div>
      </div>
    </>
  );
}

export default WeatherCard;
