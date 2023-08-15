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

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);
    const weatherData = await response.json();

    if (weatherData.cod === '404') {
      res.json({ weatherText: 'City is not found!' });
    } else {
      const temperature = weatherData.main.temp;
      res.json({ weatherText: `Temperature in ${cityName}: ${temperature}°C` });
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});



export default app; 