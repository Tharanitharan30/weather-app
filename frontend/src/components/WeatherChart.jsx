import { useEffect, useRef } from 'react';
import '../styles/WeatherChart.css';

const WeatherChart = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Get temperature data
    const temps = data.map(d => d.temperature || d.temp || 0);
    const maxTemp = Math.max(...temps);
    const minTemp = Math.min(...temps);
    const tempRange = maxTemp - minTemp || 1;

    // Chart dimensions
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Draw grid lines
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw temperature line
    ctx.strokeStyle = '#ff6b6b';
    ctx.lineWidth = 3;
    ctx.beginPath();

    temps.forEach((temp, i) => {
      const x = padding + (chartWidth / (temps.length - 1)) * i;
      const y = padding + chartHeight - ((temp - minTemp) / tempRange) * chartHeight;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw points
    ctx.fillStyle = '#ff6b6b';
    temps.forEach((temp, i) => {
      const x = padding + (chartWidth / (temps.length - 1)) * i;
      const y = padding + chartHeight - ((temp - minTemp) / tempRange) * chartHeight;
      
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();

      // Draw temperature labels
      ctx.fillStyle = '#333';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${Math.round(temp)}°`, x, y - 15);
    });

    // Draw axis labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    data.forEach((item, i) => {
      const x = padding + (chartWidth / (temps.length - 1)) * i;
      const label = item.date ? new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : `Day ${i + 1}`;
      ctx.fillText(label, x, height - 15);
    });

  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="weather-chart">
        <h3 className="chart-title">
          <svg className="title-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Temperature Trend
        </h3>
        <div className="chart-empty">
          <p>No data available for chart</p>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-chart">
      <h3 className="chart-title">
        <svg className="title-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Temperature Trend
      </h3>
      <div className="chart-container">
        <canvas ref={canvasRef} width={800} height={300} />
      </div>
    </div>
  );
};

export default WeatherChart;
