# WTWR (What To Wear)

Aplicación web para compartir y consultar prendas de ropa según el clima.

---

## Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación Local](#instalación-local)
- [Despliegue en Producción](#despliegue-en-producción)
- [Variables de Entorno](#variables-de-entorno)
- [Configuración de Nginx](#configuración-de-nginx)
- [Certificados SSL](#certificados-ssl)
- [Autores](#autores)

---

## Descripción

WTWR es una aplicación web donde los usuarios pueden compartir prendas de ropa y ver recomendaciones basadas en el clima actual.

---

## Tecnologías

- **Frontend:** React + Vite
- **Despliegue:** Google Cloud VM, Nginx, Certbot (Let's Encrypt)

---

## Estructura del Proyecto

## 📌 Main Features

- 🔍 Gets your location using the browser's geolocation.
- 🌡 Fetches current temperature using an external API.
- 🏙 Displays the name of your city.
- 🧥 Filters and shows clothing cards based on the weather.
- 🧭 Dynamic UI with reusable components (Header, Main, Footer).

---

## Links

- 🎥 Video: (https://drive.google.com/file/d/1eudOzGmCdUco_PLLlmAfe8PWBfRuapBI/view?usp=drive_link)
- 💻 Backend: (https://github.com/Lenin-Miranda/se_project_express)
- 🕸️ Deploy:(https://www.wtwrle.ignorelist.com/)

---

## 🧠 Weather Logic

We use `navigator.geolocation.getCurrentPosition()` to get coordinates. Then we make two API requests:

1. **Weather data** from OpenWeather:

```js
fetchWeatherByCoords(latitude, longitude)s

```
