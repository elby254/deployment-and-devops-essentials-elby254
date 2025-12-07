if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// Demo API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend' });
});

const PORT = process.env.PORT || 5000;

// Use Mongo connection string from Render env settings
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Mongo connection failed', err));

app.listen(PORT, () => console.log('Server running on port ' + PORT));
