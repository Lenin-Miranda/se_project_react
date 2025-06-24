# WTWH (What to Wear)🌦👕

A React application that displays the current weather based on your location and filters recommended clothing items accordingly.

## 📌 Main Features

- 🔍 Gets your location using the browser’s geolocation.
- 🌡 Fetches current temperature using an external API.
- 🏙 Displays the name of your city.
- 🧥 Filters and shows clothing cards based on the weather.
- 🧭 Dynamic UI with reusable components (Header, Main, Footer).

---

## Links

- 🎥 Video: (https://drive.google.com/file/d/1eudOzGmCdUco_PLLlmAfe8PWBfRuapBI/view?usp=drive_link)
- 💻 Backend: (https://github.com/Lenin-Miranda/se_project_express)

---

## 🧠 Weather Logic

We use `navigator.geolocation.getCurrentPosition()` to get coordinates. Then we make two API requests:

1. **Weather data** from OpenWeather:

```js
fetchWeatherByCoords(latitude, longitude)s

```
