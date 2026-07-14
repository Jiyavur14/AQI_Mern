require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Initialize MongoDB
connectDB();

const app = express();

// Standard middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5175",
      "https://aqi-mern.onrender.com",
    ],
    credentials: true,
  })
);
app.use(helmet({
  contentSecurityPolicy: false, // Turn off Content-Security-Policy restrictions for developmental ease
}));
app.use(morgan('dev'));
app.use(express.json());

// Routes mapping
app.use('/users', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Default root route
app.get('/', (req, res) => {
  res.send('AQI Buddy API is running...');
});

//Health
app.get('/health', (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "AQI Buddy Backend Running"
  });
});

// Custom Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || 'An unexpected server error occurred',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});
