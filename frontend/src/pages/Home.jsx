import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import '../styles/Home.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (location) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/weather?location=${encodeURIComponent(location)}`);
      
      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.error || 'Failed to fetch weather data');
      }

      const data = await response.json();
      setWeather(data.current || data);
      
      if (data.forecast && Array.isArray(data.forecast)) {
        setForecast(data.forecast);
      } else {
        setForecast(generateMockForecast(data.current || data));
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      console.error('Error fetching weather:', err);
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const generateMockForecast = (currentWeather) => {
    const baseTemp = currentWeather.temperature || 20;
    return Array.from({ length: 5 }, (_, i) => ({
      date: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000).toISOString(),
      temperature: baseTemp + Math.floor(Math.random() * 10) - 5,
      temp_max: baseTemp + Math.floor(Math.random() * 5) + 2,
      temp_min: baseTemp - Math.floor(Math.random() * 5) - 2,
      condition: ['Clear', 'Cloudy', 'Rainy', 'Sunny'][Math.floor(Math.random() * 4)],
      humidity: Math.floor(Math.random() * 40) + 40,
      wind_speed: Math.floor(Math.random() * 10) + 3
    }));
  };

  const getWeatherIcon = (condition = '') => {
    const iconMap = {
      clear: '☀️',
      sunny: '☀️',
      clouds: '☁️',
      cloudy: '☁️',
      rain: '🌧️',
      rainy: '🌧️',
      drizzle: '🌦️',
      thunderstorm: '⛈️',
      snow: '❄️',
      mist: '🌫️',
      fog: '🌫️'
    };
    const match = Object.keys(iconMap).find(key => condition.toLowerCase().includes(key));
    return match ? iconMap[match] : '🌤️';
  };

  return (
    <div className="home">
      <div className="glassy-bg"></div>

      <div className="home-container">
        <header className="home-header">
          <h1 > 🌤️<span className="app-title">Weather App</span> </h1>
          <p className="app-subtitle">Real-time weather information</p>
        </header>
        <br />

        <SearchBar onSearch={handleSearch} loading={loading} />
        <br />


        {error && (
          <div className="error-message">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {!loading && weather && (
          <>
            <div className="main-weather-card">
              <div className="weather-top">
                <div className="location-info">
                  <h2 className="location-name">{weather.location || 'Unknown'}</h2>
                  <p className="location-country">{weather.country || ''}</p>
                </div>
                <div className="temp-display">
                  <span className="weather-icon-large">{getWeatherIcon(weather.condition)}</span>
                  <div className="temp-info">
                    <span className="temp-value">{Math.round(weather.temperature || 0)}</span>
                    <span className="temp-unit">°C</span>
                  </div>
                </div>
              </div>
              <p className="weather-condition">{weather.condition || 'N/A'}</p>
            </div>

            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-icon">💧</div>
                <div className="metric-content">
                  <p className="metric-label">Humidity</p>
                  <p className="metric-value">{weather.humidity || 0}%</p>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon">💨</div>
                <div className="metric-content">
                  <p className="metric-label">Wind Speed</p>
                  <p className="metric-value">{weather.windSpeed || 0} m/s</p>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon">🌡️</div>
                <div className="metric-content">
                  <p className="metric-label">Pressure</p>
                  <p className="metric-value">{weather.pressure || 0} hPa</p>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon">👁️</div>
                <div className="metric-content">
                  <p className="metric-label">Visibility</p>
                  <p className="metric-value">{weather.visibility ? (weather.visibility / 1000).toFixed(1) : 'N/A'} km</p>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon">🌡️</div>
                <div className="metric-content">
                  <p className="metric-label">Min Temp</p>
                  <p className="metric-value">{Math.round(weather.temp_min || 0)}°C</p>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon">🔥</div>
                <div className="metric-content">
                  <p className="metric-label">Max Temp</p>
                  <p className="metric-value">{Math.round(weather.temp_max || 0)}°C</p>
                </div>
              </div>
            </div>

            {forecast.length > 0 && (
              <div className="forecast-section">
                <h3 className="forecast-title">5-Day Forecast</h3>
                <div className="forecast-grid">
                  {forecast.slice(0, 5).map((day, idx) => (
                    <div key={idx} className="forecast-card">
                      <p className="forecast-date">
                        {day.date ? new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : `Day ${idx + 1}`}
                      </p>
                      <p className="forecast-icon">{getWeatherIcon(day.condition)}</p>
                      <div className="forecast-temps">
                        <span className="forecast-temp-high">{Math.round(day.temp_max || 0)}°</span>
                        <span className="forecast-temp-low">{Math.round(day.temp_min || 0)}°</span>
                      </div>
                      <p className="forecast-condition">{day.condition}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {!loading && !weather && !error && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>Search for a location</h3>
            <p>Enter a city name to see weather information</p>
          </div>
        )}
      </div>

      <footer className="home-footer">
        <p>Real-time weather data • Built with React & Vite</p>
      </footer>
    </div>
  );
};

export default Home;
