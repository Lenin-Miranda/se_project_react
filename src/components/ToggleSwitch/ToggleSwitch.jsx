import React, { useContext } from "react";
import CurrentTemperatureUnitContext from "../../context/currenTemperatureUnit";
import "./ToggleSwitch.css";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <>
      <input
        checked={currentTemperatureUnit === "C"}
        onChange={handleToggleSwitchChange}
        type="checkbox"
        className="toggle__input"
        id="toggle__input"
      />
      <label htmlFor="toggle__input" className="toggle__label">
        <span className="toggle__button"></span>
        <span
          className="toggle__text"
          style={{ color: currentTemperatureUnit === "F" ? "#fff" : "#7e7e7e" }}
        >
          F
        </span>
        <span
          className="toggle__text"
          style={{ color: currentTemperatureUnit === "C" ? "#fff" : "#7e7e7e" }}
        >
          C
        </span>
      </label>
    </>
  );
}

export default ToggleSwitch;
