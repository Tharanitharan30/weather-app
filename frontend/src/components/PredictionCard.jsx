import '../styles/PredictionCard.css';

const PredictionCard = ({ predictions }) => {
  if (!predictions || predictions.length === 0) {
    return (
      <div className="prediction-card">
        <h3 className="prediction-title">Weather Forecast</h3>
        <div className="prediction-empty">
          <svg className="forecast-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p>No forecast data available</p>
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="prediction-card">
      <h3 className="prediction-title">
        <svg className="title-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        5-Day Forecast
      </h3>
      
      <div className="prediction-grid">
        {predictions.slice(0, 5).map((day, index) => (
          <div key={index} className="prediction-item">
            <p className="prediction-date">
              {day.date ? formatDate(day.date) : `Day ${index + 1}`}
            </p>
            <div className="prediction-icon">
              {getWeatherIcon(day.condition || day.description || '')}
            </div>
            <div className="prediction-temp">
              <span className="temp-high">{Math.round(day.temp_max || day.temperature || 0)}°</span>
              <span className="temp-low">{Math.round(day.temp_min || day.temperature - 5 || 0)}°</span>
            </div>
            <p className="prediction-condition">
              {day.condition || day.description || 'N/A'}
            </p>
            <div className="prediction-details">
              <span>💧 {day.humidity || 0}%</span>
              <span>💨 {day.wind_speed || day.windSpeed || 0} m/s</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictionCard;
