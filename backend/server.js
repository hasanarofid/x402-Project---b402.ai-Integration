const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const paymentRoutes = require('./routes/payment');
const x402Routes = require('./routes/x402');

// Routes
app.use('/api/payment', paymentRoutes);
app.use('/api/x402', x402Routes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'x402 Backend Server is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Selamat datang di x402 Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      payment: '/api/payment',
      x402: '/api/x402'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint tidak ditemukan' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Terjadi kesalahan pada server',
    message: err.message 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV}`);
  console.log(`💳 b402 API: ${process.env.B402_API_URL}`);
  console.log(`🔗 Facilitator: ${process.env.B402_FACILITATOR_URL}`);
});

module.exports = app;

