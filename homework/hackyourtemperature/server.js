import express from 'express';
import fetch from 'node-fetch';
import { API_KEY } from './sources/keys.js';


const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

const PORT = 3000;



app.post('/weather', async (req, res) => {
  const cityName = req.body.cityName;

  // Check if cityName is missing in the request
  if (!cityName) {
    return res.status(400).json({ error: 'CityName is required in the request body' });
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);
    const weatherData = await response.json();

    if (response.status === 401) {
      return res.status(401).json({ error: 'Unauthorized: API key is invalid or missing' });
    }

    if (response.status >= 500) {
      return res.status(response.status).json({ error: 'Server error from OpenWeatherMap API' });
    }

    if (weatherData.cod === '404') {
      return res.json({ weatherText: 'City is not found!' });
    } else if (response.status === 200) {
      const temperature = weatherData.main.temp;
      return res.json({ weatherText: `Temperature in ${cityName}: ${temperature}°C` });
    } else {
      return res.status(500).json({ error: 'Unknown error from OpenWeatherMap API' });
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return res.status(500).json({ error: 'Error fetching weather data' });
  }
});



export default app; 