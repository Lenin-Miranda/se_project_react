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

```
/
├── dist/         # Archivos estáticos generados para producción (build)
├── src/          # Código fuente del frontend (React)
├── public/       # Archivos públicos
├── package.json  # Dependencias y scripts de npm
├── vite.config.js
└── README.md
```

---

## Instalación Local

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
   ```

2. **Instala dependencias**

   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**

   ```bash
   npm run dev
   ```

4. **Configura las variables de entorno**  
   Crea un archivo `.env` en la raíz del proyecto con las variables necesarias (ver sección [Variables de Entorno](#variables-de-entorno)).

---

## Despliegue en Producción

1. **Genera la build de producción**

   ```bash
   npm run build
   ```

   Esto creará la carpeta `dist/` con los archivos estáticos listos para producción.

2. **Sube la carpeta `dist/` a tu VM de Google Cloud**  
   Puedes usar `scp`, `rsync` o cualquier método de transferencia de archivos.

3. **Configura Nginx en tu VM** para servir los archivos estáticos y redirigir las peticiones API a tu backend.

---

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
VITE_API_URL=https://api.wtwrle.ignorelist.com
```

Asegúrate de que tu código use esta variable para las peticiones al backend.

---

## Configuración de Nginx

Ejemplo de bloque para servir el frontend:

```nginx
server {
    listen 443 ssl;
    server_name wtwrle.ignorelist.com www.wtwrle.ignorelist.com;

    root /home/usuario/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    ssl_certificate /etc/letsencrypt/live/wtwrle.ignorelist.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/wtwrle.ignorelist.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}
```

Si tu backend está en otro subdominio (ej: `api.wtwrle.ignorelist.com`), asegúrate de que las peticiones desde el frontend usen ese dominio.

---

## Certificados SSL

Se recomienda usar [Certbot](https://certbot.eff.org/) para obtener certificados gratuitos de Let's Encrypt.

---

## Autores

- [Lenin Miranda](https://github.com/Lenin-Miranda)

---

## 🧠 Weather Logic

We use `navigator.geolocation.getCurrentPosition()` to get coordinates. Then we make two API requests:

1. **Weather data** from OpenWeather:

```js
fetchWeatherByCoords(latitude, longitude)s

```
