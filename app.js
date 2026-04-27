<<<<<<< HEAD
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();


// Serve static files from "public"
app.use(express.static(path.join(__dirname, 'public')));

// Weather API route
app.get('/search', async (req, res) => {
  try {
    const city = req.query.city ;
    const state = req.query.state

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)},${encodeURIComponent(state)}&appid=${process.env.API_KEY}&units=metric`
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.message || 'Failed to fetch weather data'
      });
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
=======
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 9999;

// Serve static files from "public"
app.use(express.static(path.join(__dirname, 'public')));

// Weather API route
app.get('/search', async (req, res) => {
  try {
    const city = req.query.city ;
    const state = req.query.state

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)},${encodeURIComponent(state)}&appid=${process.env.API_KEY}&units=metric`
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.message || 'Failed to fetch weather data'
      });
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
>>>>>>> 7281706ca38d4c1bdb3400fe337d74a3b5a4f0d0
