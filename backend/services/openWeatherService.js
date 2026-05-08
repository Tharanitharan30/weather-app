const { OPEN_WEATHER_BASE_URL, WEATHER_UNITS } = require('../config/apiConfig');

const buildUrl = (endpoint, location, apiKey) => {
	const params = new URLSearchParams({
		q: location,
		appid: apiKey,
		units: WEATHER_UNITS
	});

	return `${OPEN_WEATHER_BASE_URL}/${endpoint}?${params.toString()}`;
};

const requestWeather = async (endpoint, location, apiKey) => {
	const url = buildUrl(endpoint, location, apiKey);
	const response = await fetch(url);

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		const message = errorData.message || 'Failed to fetch weather from OpenWeather';
		const error = new Error(message);
		error.status = response.status;
		throw error;
	}

	return response.json();
};

const mapCurrentWeather = (data) => ({
	location: data.name,
	country: data.sys?.country || '',
	temperature: data.main?.temp,
	temp_min: data.main?.temp_min,
	temp_max: data.main?.temp_max,
	condition: data.weather?.[0]?.main || 'Unknown',
	description: data.weather?.[0]?.description || 'Unknown',
	humidity: data.main?.humidity,
	pressure: data.main?.pressure,
	windSpeed: data.wind?.speed,
	visibility: data.visibility,
	sunrise: data.sys?.sunrise,
	sunset: data.sys?.sunset
});

const mapForecast = (data) => {
	if (!Array.isArray(data.list)) {
		return [];
	}

	const dailyMap = new Map();

	data.list.forEach((item) => {
		const dateKey = item.dt_txt?.split(' ')[0] || new Date(item.dt * 1000).toISOString().split('T')[0];
		if (!dailyMap.has(dateKey)) {
			dailyMap.set(dateKey, item);
		}
	});

	return Array.from(dailyMap.values())
		.slice(0, 5)
		.map((item) => ({
			date: item.dt_txt || new Date(item.dt * 1000).toISOString(),
			temperature: item.main?.temp,
			temp_min: item.main?.temp_min,
			temp_max: item.main?.temp_max,
			condition: item.weather?.[0]?.main || 'Unknown',
			description: item.weather?.[0]?.description || 'Unknown',
			humidity: item.main?.humidity,
			wind_speed: item.wind?.speed
		}));
};

const fetchWeatherBundle = async (location, apiKey) => {
	const [currentRaw, forecastRaw] = await Promise.all([
		requestWeather('weather', location, apiKey),
		requestWeather('forecast', location, apiKey)
	]);

	return {
		current: mapCurrentWeather(currentRaw),
		forecast: mapForecast(forecastRaw)
	};
};

module.exports = {
	fetchWeatherBundle
};
