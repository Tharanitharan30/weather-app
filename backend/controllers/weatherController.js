const { fetchWeatherBundle } = require('../services/openWeatherService');

const getWeather = async (req, res) => {
	const location = String(req.query.location || '').trim();
	const apiKey = process.env.OPENWEATHER_API_KEY;

	if (!location) {
		return res.status(400).json({ error: 'Query parameter "location" is required.' });
	}

	if (!apiKey) {
		return res.status(500).json({ error: 'OPENWEATHER_API_KEY is not configured on the backend.' });
	}

	try {
		const weatherData = await fetchWeatherBundle(location, apiKey);
		return res.json(weatherData);
	} catch (error) {
		console.error('Weather fetch error:', error.message);

		if (error.status === 404) {
			return res.status(404).json({ error: 'Location not found. Check city name and try again.' });
		}

		if (error.status === 401) {
			return res.status(401).json({ error: 'Invalid OpenWeather API key.' });
		}

		return res.status(502).json({ error: error.message || 'Failed to fetch weather data.' });
	}
};

module.exports = {
	getWeather
};
