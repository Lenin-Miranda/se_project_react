# WTWR — What to Wear

Aplicación React para consultar el clima y organizar prendas según las condiciones del tiempo. Incluye registro/inicio de sesión, perfil y operaciones sobre prendas mediante una API Express.

**Backend:** [se_project_express](https://github.com/Lenin-Miranda/se_project_express).

## Instalación local

Necesitas Node.js, npm y el backend para las funciones de cuenta y catálogo.

```bash
git clone https://github.com/Lenin-Miranda/se_project_react.git
cd se_project_react
npm install
npm run dev
```

Abre la URL que imprime Vite. Inicia el backend en `http://localhost:3001`.

## Configuración

- [src/utils/Api.js](src/utils/Api.js) y [src/utils/auth.js](src/utils/auth.js) seleccionan la URL del backend según el modo de ejecución.
- [src/utils/WeatherApi.js](src/utils/WeatherApi.js) contiene las peticiones a OpenWeather y su configuración de acceso.
- El código actual no lee variables `VITE_*` para esas integraciones. Añadirlas a un `.env` por sí solo no cambia el comportamiento.

Configura tus propios servicios antes de usar el proyecto fuera de su entorno original.

## Comandos

| Comando | Uso |
| --- | --- |
| `npm run dev` | Servidor Vite |
| `npm run lint` | Revisión con ESLint |
| `npm run build` | Compilación a `dist/` |
| `npm run preview` | Previsualización local del build |
| `npm run deploy` | Ejecuta el build; no publica archivos en un servidor |

## Estructura

`src/` contiene componentes, estilos e integración con APIs; `public/` guarda recursos públicos. `vite.config.js` configura el empaquetado.

## Verificación

Ejecuta lint y build. Comprueba clima, registro/login, perfil y creación/eliminación de prendas con el backend local. No hay script de pruebas automatizadas. Para publicar `dist/`, configura el hosting y sus rutas de la aplicación por separado.
