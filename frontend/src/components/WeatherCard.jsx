import '../styles/WeatherCard.css';

const WeatherCard = ({ weather }) => {
  if (!weather) {
    return (
      <div className="weather-card">
        <div className="weather-card-empty">
          <svg className="cloud-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
          <p>Search for a location to see weather data</p>
        </div>
      </div>
    );
  }

  const getWeatherIcon = (condition) => {
    const icons = {
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
    
    const key = Object.keys(icons).find(k => 
      condition.toLowerCase().includes(k)
    );
    
    return key ? icons[key] : '🌤️';
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{weather.location || weather.city || 'Unknown Location'}</h2>
        <p className="weather-date">{new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</p>
      </div>

      <div className="weather-main">
        <div className="weather-icon">
          {getWeatherIcon(weather.condition || weather.description || '')}
        </div>
        <div className="weather-temp">
          <span className="temp-value">{Math.round(weather.temperature || weather.temp || 0)}</span>
          <span className="temp-unit">°C</span>
        </div>
        <p className="weather-description">
          {weather.condition || weather.description || 'N/A'}
        </p>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
          <div>
            <p className="detail-label">Humidity</p>
            <p className="detail-value">{weather.humidity || 0}%</p>
          </div>
        </div>

        <div className="detail-item">
          <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          <div>
            <p className="detail-label">Wind Speed</p>
            <p className="detail-value">{weather.windSpeed || weather.wind_speed || 0} m/s</p>
          </div>
        </div>

        <div className="detail-item">
          <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <div>
            <p className="detail-label">Pressure</p>
            <p className="detail-value">{weather.pressure || 0} hPa</p>
          </div>
        </div>

        <div className="detail-item">
          <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <div>
            <p className="detail-label">Visibility</p>
            <p className="detail-value">{weather.visibility ? (weather.visibility / 1000).toFixed(1) : 'N/A'} km</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
