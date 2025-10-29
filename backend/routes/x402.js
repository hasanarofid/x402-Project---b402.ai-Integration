const express = require('express');
const router = express.Router();
const x402Controller = require('../controllers/x402Controller');
const x402Middleware = require('../middleware/x402Middleware');

// Endpoint yang dilindungi dengan x402 payment
router.get('/protected-content', x402Middleware.requirePayment, x402Controller.getProtectedContent);

// Endpoint untuk mendapatkan payment challenge
router.get('/challenge', x402Controller.getPaymentChallenge);

// Endpoint untuk submit payment proof
router.post('/submit-payment', x402Controller.submitPaymentProof);

// Endpoint untuk mendapatkan balance
router.get('/balance/:address', x402Controller.getBalance);

module.exports = router;

