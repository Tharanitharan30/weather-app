# Weather App

A full-stack weather dashboard with a React + Vite frontend and an Express backend powered by the OpenWeather API. The UI uses a glassmorphism style with separate cards for the current weather, key metrics, and forecast data.

## Features

- Search any city or location
- Real-time current weather data
- 5-day forecast
- Separate glassy cards for humidity, wind speed, pressure, visibility, min temp, and max temp
- Responsive dashboard layout
- Error and loading states

## Tech Stack

- Frontend: React, Vite, CSS
- Backend: Node.js, Express
- API: OpenWeatherMap

## Project Structure

```text
weather-app/
├── backend/
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   └── utils/
└── frontend/
	├── src/
	│   ├── components/
	│   ├── pages/
	│   ├── services/
	│   └── styles/
	└── vite.config.js
```

## Prerequisites

- Node.js 18+ recommended
- An OpenWeatherMap API key

## Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd weather-app
```

### 2. Configure the backend

Create a `.env` file in `backend/` with:

```env
OPENWEATHER_API_KEY=your_openweather_api_key
PORT=5000
```

### 3. Configure the frontend

Create a `.env` file in `frontend/` with:

```env
VITE_API_BASE_URL=http://localhost:5000
```

### 4. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Running the App

### Start the backend

```bash
cd backend
npm run dev
```

The API will run on `http://localhost:5000`.

### Start the frontend

```bash
cd frontend
npm run dev
```

The app will run on the Vite dev server shown in the terminal.

## Available Scripts

### Backend

- `npm run start` - Start the Express server
- `npm run dev` - Start the Express server

### Frontend

- `npm run dev` - Start the Vite dev server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## API Endpoints

- `GET /api/health` - Health check for the backend
- `GET /api/weather?location=London` - Get current weather and forecast for a location

## Notes

- The backend requires a valid `OPENWEATHER_API_KEY`.
- If the frontend cannot reach the backend, check `VITE_API_BASE_URL`.
- The UI is built to fall back gracefully when weather data is unavailable.
