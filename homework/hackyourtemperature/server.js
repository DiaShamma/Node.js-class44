import express from 'express';

const app = express();


app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Post Request 

app.post('/weather', (req, res) => {
  const cityName = req.body.cityName;
  res.send(`You submitted: ${cityName}`);
});
