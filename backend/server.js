const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const weatherRoutes = require('./routes/weatherRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
	res.json({ ok: true, service: 'weather-backend' });
});

app.use('/api/weather', weatherRoutes);

app.use((err, req, res, next) => {
	console.error('Unhandled error:', err);
	res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
	console.log(`Weather backend listening on port ${port}`);
});
