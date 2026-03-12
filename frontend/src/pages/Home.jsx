import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import PredictionCard from '../components/PredictionCard';
import WeatherChart from '../components/WeatherChart';
import '../styles/Home.css';

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (location) => {
    setLoading(true);
    setError(null);

    try {
      // Replace with your backend API endpoint
      const response = await fetch(`http://localhost:5000/api/weather?location=${encodeURIComponent(location)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      
      // Set current weather
      setWeather(data.current || data);
      
      // Set forecast data
      if (data.forecast && Array.isArray(data.forecast)) {
        setForecast(data.forecast);
      } else {
        // Generate mock forecast data if not available
        setForecast(generateMockForecast(data.current || data));
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      console.error('Error fetching weather:', err);
      
      // For demo purposes, generate mock data
      const mockData = generateMockData(location);
      setWeather(mockData.current);
      setForecast(mockData.forecast);
    } finally {
      setLoading(false);
    }
  };

  // Mock data generator for demo purposes
  const generateMockData = (location) => {
    const baseTemp = Math.floor(Math.random() * 20) + 15;
    return {
      current: {
        location: location,
        temperature: baseTemp,
        condition: 'Partly Cloudy',
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 10) + 5,
        pressure: Math.floor(Math.random() * 50) + 1000,
        visibility: Math.floor(Math.random() * 5000) + 5000
      },
      forecast: Array.from({ length: 5 }, (_, i) => ({
        date: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000).toISOString(),
        temperature: baseTemp + Math.floor(Math.random() * 10) - 5,
        temp_max: baseTemp + Math.floor(Math.random() * 5) + 2,
        temp_min: baseTemp - Math.floor(Math.random() * 5) - 2,
        condition: ['Clear', 'Cloudy', 'Rainy', 'Sunny'][Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 40) + 40,
        wind_speed: Math.floor(Math.random() * 10) + 3
      }))
    };
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

  return (
    <div className="home">
      <header className="home-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-icon">🌤️</span>
            Weather Dashboard
          </h1>
          <p className="app-subtitle">Get real-time weather updates and forecasts</p>
        </div>
      </header>

      <div className="home-container">
        <SearchBar onSearch={handleSearch} loading={loading} />

        {error && (
          <div className="error-message">
            <svg className="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{error}</p>
          </div>
        )}

        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        <div className="dashboard-grid">
          <div className="grid-main">
            <WeatherCard weather={weather} />
          </div>
          
          <div className="grid-side">
            <PredictionCard predictions={forecast} />
          </div>
        </div>

        {forecast.length > 0 && (
          <div className="chart-section">
            <WeatherChart data={forecast} />
          </div>
        )}
      </div>

      <footer className="home-footer">
        <p>Weather data provided by various sources • Built with React & Vite</p>
      </footer>
    </div>
  );
};

export default Home;
