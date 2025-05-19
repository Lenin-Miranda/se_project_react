const ApiKey = "6d7837223690b783eb400bcc5c5bf085";
export const fetchWeatherByCoords = async (lat, lon) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${ApiKey}`
  );
  if (!res.ok) {
    console.error("Failed to fetch Weather");
  }
  return res.json();
};

export const fetchCityByCoords = (lat, lon) => {
  return fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${ApiKey}`
  ).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch city name");
    }
    return res.json();
  });
};
export default { fetchCityByCoords, fetchWeatherByCoords };
